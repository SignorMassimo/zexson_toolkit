import { tokenGenerator } from './generator';
import type { base64DecodeType, cryptObject, decryptType, encryptType, IsEqualOptions, isEqualType } from './types';
import { base64EncodeType, CharacterSetType } from './types';

/**
 * Encrypts a string using custom logic with random padding and Base64 encoding.
 * 
 * @param {string} data - The string to encrypt.
 * @param {Object} [options] - Encryption options.
 * @param {CharacterSetType} [options.firstRandomCharSet] - Character set for the first random padding.
 * @param {CharacterSetType} [options.secondRandomCharSet] - Character set for the second random padding.
 * @param {string} [options.key] - Encryption key for additional security.
 * @returns {Promise<string | undefined>} The encrypted string or `undefined` if encryption fails.
 * @throws {Error} Throws if the encryption process encounters an issue.
 * 
 * @example
 * const encrypted = await encrypt("hello");
 * const customEncrypted = await encrypt("hello", { key: "myCustomKey" });
 * 
 * @since 1.0.0
 * @category Encryption
 */
export const encrypt: encryptType = (data: string, options: { firstRandomCharSet?: CharacterSetType, secondRandomCharSet?: CharacterSetType, key?: string } | undefined = undefined): string | undefined => {
    try {
        if (options === undefined)
            options = {
                firstRandomCharSet: 'defaultSet',
                secondRandomCharSet: 'defaultSet',
                key: 'qwertyuioplkjhgfdsazxcvbnm'
            }
        if (typeof data === 'object') return encryptObject(data, options.key)
        data = data.trim()
        let res: string = ''
        const randomChars0: string = tokenGenerator(Math.floor(Math.random() * (5 + 15) + 1), options?.firstRandomCharSet as CharacterSetType),
            randomChars1: string = tokenGenerator(Math.floor(Math.random() * (5 + 15) + 1), options?.secondRandomCharSet as CharacterSetType),
            firsPart: string = String.fromCharCode(randomChars0.length + 85),
            secondPart: string = String.fromCharCode(randomChars1.length + 85)
        for (let i: number = 0; i < data.length; i++) {
            const charCode: number = data[i].charCodeAt(0)
            res += String.fromCharCode((charCode + 80) - 70)
        }
        let encrypted: string = firsPart + randomChars0 + res + randomChars1 + secondPart
        encrypted = base64Encode(encrypted.split('').map(char => {
            const DataCharCode: number = char.charCodeAt(0)
            return String.fromCharCode((DataCharCode + 80) - 70)
        }).join(''), options.key)
        if (decrypt(encrypted, { key: options.key }) === data) return encrypted
        else {
            encrypt(data, options)
        }
    } catch (err) {
        throw new Error(`Error occurred during encoding: ${err}`)
    }
}

/**
 * Decrypts a string that was encrypted using the `encrypt` function.
 * 
 * @param {string} data - The encrypted string to decrypt.
 * @param {Object} [options] - Decryption options.
 * @param {string} [options.key] - Encryption key used during encryption.
 * @returns {Promise<string>} The decrypted original string.
 * @throws {Error} Throws if the decryption process encounters an issue.
 * 
 * @example
 * const decrypted = await decrypt(encryptedString);
 * const customDecrypted = await decrypt(encryptedString, { key: "myCustomKey" });
 * 
 * @since 1.0.0
 * @category Decryption
 */
export const decrypt: decryptType = (data: string, options: { key?: string } | undefined = undefined): string => {
    try {
        if (options === undefined) options = { key: 'qwertyuioplkjhgfdsazxcvbnm' }
        data = base64Decode(data.trim(), options.hasOwnProperty('key') ? options.key as string : 'secretKey').split('').map(char => {
            const DataCharCode: number = char.charCodeAt(0)
            return String.fromCharCode((DataCharCode - 80) + 70)
        }).join('')
        let res: string = ''
        const firsPart: number = data[0].charCodeAt(0) - 85,
            secondPart: number = data.slice(-1).charCodeAt(0) - 85
        for (let i: number = firsPart + 1; i < data.length; i++) {
            const charCode: number = data[i].charCodeAt(0),
                length: number = data.slice(i, data.length - 1).length
            if (length !== secondPart) res += String.fromCharCode((charCode - 80) + 70)
            else break
        }
        return res
    } catch (err) {
        throw new Error(`Error occurred during decoding: ${err}`)
    }
}

/**
 * Encodes a string using a custom Base64 algorithm with added character shifting.
 * 
 * @param {string} data - The string to encode.
 * @param {string} [key='qwertyuioplkjhgfdsazxcvbnm'] - Key for influencing the encoding process.
 * @returns {string} The encoded string.
 * @throws {Error} Throws if encoding fails.
 * 
 * @example
 * const encoded = base64Encode("Hello, World!");
 * const customEncoded = base64Encode("Hello, World!", "customKey123");
 * 
 * @since 1.0.5
 * @category Encoding
 */
export const base64Encode: base64EncodeType = (data: string, key: string = 'qwertyuioplkjhgfdsazxcvbnm'): string => {
    const shiftChar: (char: string, shift: number) => string = (char: string, shift: number): string => {
        const code: number = char.charCodeAt(0)
        return String.fromCharCode(code + shift)
    },
        keySum: number = key.split('').reduce((acc, char): number => acc + char.charCodeAt(0), 0),
        shifted: string = data
            .split('')
            .map((char, index): string => shiftChar(char, (keySum + index) % 20))
            .join(''),
        step1: string = Buffer.from(shifted).toString('base64'),
        step2: string = Buffer.from(step1).toString('base64'),
        finalMix: string = step2
            .split('')
            .map((char, index): string => shiftChar(char, index % 5))
            .join('')
    return finalMix
}

/**
 * Decodes a string encoded by `base64Encode` back to its original form.
 * 
 * @param {string} encryptedData - The string to decode.
 * @param {string} [key='qwertyuioplkjhgfdsazxcvbnm'] - The key used during encoding.
 * @returns {string} The decoded string.
 * @throws {Error} Throws if decoding fails.
 * 
 * @example
 * const decoded = base64Decode(encodedString);
 * const customDecoded = base64Decode(encodedString, "customKey123");
 * 
 * @since 1.0.5
 * @category Decoding
 */
export const base64Decode: base64DecodeType = (encryptedData: string, key: string | undefined = 'qwertyuioplkjhgfdsazxcvbnm'): string => {
    if (key === undefined) key = 'qwertyuioplkjhgfdsazxcvbnm'
    const unshiftChar: (char: string, shift: number) => string = (char: string, shift: number): string => {
        const code: number = char.charCodeAt(0)
        return String.fromCharCode(code - shift)
    },
        keySum: number = key.split('').reduce((acc, char): number => acc + char.charCodeAt(0), 0),
        unmixed: string = encryptedData
            .split('')
            .map((char, index): string => unshiftChar(char, index % 5))
            .join(''),
        step1: string = Buffer.from(unmixed, 'base64').toString(),
        step2: string = Buffer.from(step1, 'base64').toString(),
        final: string = step2
            .split('')
            .map((char, index): string => unshiftChar(char, (keySum + index) % 20))
            .join('')
    return final
}

/**
 * Compares a plain text string with an encrypted string for equality.
 * 
 * @param {string} text - The plain text string.
 * @param {string} encrypted - The encrypted string to compare.
 * @param {IsEqualOptions} [options] - Comparison options (e.g., case sensitivity).
 * @returns {Promise<{ isEqual: boolean; method?: string }>} Indicates if the strings match and the method used.
 * 
 * @example
 * const match = await isEqual("hello", encryptedString);
 * const caseInsensitiveMatch = await isEqual("hello", encryptedString, { caseSensitive: false });
 * 
 * @since 1.0.0
 * @category Comparison
 */
export const isEqual: isEqualType = (text: string, text1: string, options?: IsEqualOptions | undefined): { isEqual: boolean; method?: string } => {
    try {
        let Text: string = text,
            Text1: string = text1,
            logMessage: string = ''
        options = options || { caseSensitive: true }

        const key: string | undefined = options.key || undefined,
            isCaseSensitive: "toLowerCase" | "toString" = !options.caseSensitive ? "toLowerCase" : "toString",
            logMatch: (method: string, details: any) => void = (method: string, details: any): void => options?.log ? console.log(`✅ Eşleşme bulundu ${method}:`, details) : undefined

        if (Text === Text1 || Text[isCaseSensitive]() === Text1 || Text === Text1[isCaseSensitive]() || Text[isCaseSensitive]() === Text1[isCaseSensitive]()) {
            logMessage = "Direct comparison"
            logMatch(logMessage, { Text: Text[isCaseSensitive](), Text1 })
            return { isEqual: true, method: logMessage }
        }

        let decryptedText: string | null = null,
            decryptedText1: string | null = null

        try {
            decryptedText = decrypt(Text, { key })
        } catch (error) {
            decryptedText = Text
        }

        try {
            decryptedText1 = decrypt(Text1, { key })
        } catch (error) {
            decryptedText1 = Text1
        }
        if (decryptedText1 === Text || decryptedText1[isCaseSensitive]() === Text || decryptedText1 === Text[isCaseSensitive]() || decryptedText1[isCaseSensitive]() === Text[isCaseSensitive]()) {
            logMessage = 'Decrypted Text1 matched Text'
            logMatch(logMessage, { decryptedText1, Text })
            return { isEqual: true, method: logMessage }
        }

        if (decryptedText === Text1 || decryptedText[isCaseSensitive]() === Text1) {
            logMessage = "Decrypted Text matches Text1"
            logMatch(logMessage, { decryptedText, Text1 })
            return { isEqual: true, method: logMessage }
        }

        if (decryptedText1 === decryptedText || decryptedText1[isCaseSensitive]() === decryptedText || decryptedText1 === decryptedText[isCaseSensitive]()) {
            logMessage = "Both decrypted values ​​match"
            logMatch(logMessage, { decryptedText1, decryptedText })
            return { isEqual: true, method: logMessage }
        }

        if (options.log) console.log("❌ No matches found:", { Text, Text1, decryptedText1, decryptedText })
        return { isEqual: false }

    } catch (err) {
        console.error("isEqual function error:", err)
        return { isEqual: false }
    }
}

/**
 * Encrypts all values in an object.
 *
 * @template T - An object type where keys are strings, and values are strings.
 * @param {T} data - The object containing values to be encrypted.
 * @param {string} [key='qwertyuioplkjhgfdsazxcvbnm'] - The encryption key to use.
 * @returns {T} A new object with encrypted values.
 * @throws {Error} If encryption fails for any value.
 *
 * @example
 * const data = { username: 'JohnDoe', password: '12345' };
 * const encryptedData = encryptObject(data, 'my-secret-key');
 *
 * @since 1.0.7
 * @category Encryption
 * @public
 */
export const encryptObject: cryptObject = <T extends Record<string, any>>(data: T, key: string = 'qwertyuioplkjhgfdsazxcvbnm'): T => {
    const encryptedData: T = {} as T
    for (const [k, v] of Object.entries(data)) {
        if (typeof v == 'string' || typeof v == 'number' || typeof v == 'boolean')
            (encryptedData[k] as keyof T) = encrypt(String(v).toString().trim(), { key }) as string
        else if (Array.isArray(v)) {
            const encryptedArray: any[] = v.map(item => {
                if (typeof item === 'string' || typeof item == 'number') return encrypt(String(item), { key })
                if (Array.isArray(item)) return item.map(subItem =>
                    typeof subItem === 'string' || typeof subItem === 'number' ? encrypt(String(subItem), { key }) :
                        Array.isArray(subItem) ? encryptObject({ arr: subItem }, key).arr :
                            typeof subItem === 'object' ? encryptObject(subItem, key) : subItem
                )
                if (typeof item === 'object') return encryptObject(item, key)
                return item
            })
                ; (encryptedData[k] as keyof T) = encryptedArray as any
        }
        else if (typeof v == 'object')
            (encryptedData[k] as keyof T) = encryptObject(v, key)
        else (encryptedData[k] as keyof T) = v
    }
    return encryptedData
}

/**
 * Decrypts all values in an object.
 *
 * @template T - An object type where keys are strings, and values are encrypted strings.
 * @param {T} data - The object containing values to be decrypted.
 * @param {string} [key='qwertyuioplkjhgfdsazxcvbnm'] - The decryption key to use.
 * @returns {T} A new object with decrypted values.
 * @throws {Error} If decryption fails for any value.
 *
 * @example
 * const encryptedData = { username: 'abc123', password: 'def456' };
 * const decryptedData = decryptObject(encryptedData, 'my-secret-key');
 *
 * @since 1.0.7
 * @category Decryption
 * @public
 */
export const decryptObject: cryptObject = <T extends Record<string, any>>(data: T, key: string = 'qwertyuioplkjhgfdsazxcvbnm'): T => {
    const decryptedData = {} as T
    for (const [k, v] of Object.entries(data)) {
        if (typeof v == 'string')
            (decryptedData[k] as keyof T) = decrypt(String(v).toString().trim(), { key }) as string
        else if (Array.isArray(v)) {
            const decryptedArray: any[] = v.map(item => {
                if (typeof item === 'string') return decrypt(item, { key })
                if (Array.isArray(item)) return item.map(subItem =>
                    typeof subItem === 'string' ? decrypt(subItem, { key }) :
                        Array.isArray(subItem) ? decryptObject({ arr: subItem }, key).arr :
                            typeof subItem === 'object' ? decryptObject(subItem, key) : subItem
                )
                if (typeof item === 'object') return decryptObject(item, key)
                return item
            })
                ; (decryptedData[k] as keyof T) = decryptedArray as any
        }
        else if (typeof v == 'object')
            (decryptedData[k] as keyof T) = decryptObject(v, key)
        else (decryptedData[k] as keyof T) = v
    }
    return decryptedData
}