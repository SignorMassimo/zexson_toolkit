/**
 * Represents the available character set options for cryptographic operations.
 * 
 * @type {('standardSet' | 'alternateSet1' | 'alternateSet2')}
 * 
 * @since 1.0.0
 * @category Tyoe Definitions
 * @public
 */
export type CharacterSetType = 'defaultSet' | 'set1' | 'set2'

/**
 * Defines the type for the `encrypt` function.
 * 
 * @param {string} input - The plain text input to be encrypted.
 * @param {CryptoCharacterSet} randomSetOne - The character set for the first layer of randomization.
 * @param {CryptoCharacterSet} randomSetTwo - The character set for the second layer of randomization.
 * @returns {string} The resulting encrypted string.
 * @throws {Error} If an encryption error occurs.
 * 
 * @since 1.0.0
 * @category Type Encrypt
 * @public
 */
export type encryptType = (data: string, options?: {
    firstRandomCharSet?: CharacterSetType;
    secondRandomCharSet?: CharacterSetType;
    key?: string
} | undefined) => string | undefined

/**
 * Defines the type for the `decrypt` function.
 * 
 * @param {string} input - The encrypted input to be decrypted.
 * @param {CryptoCharacterSet} randomSetOne - The character set for the first layer of randomization.
 * @param {CryptoCharacterSet} randomSetTwo - The character set for the second layer of randomization.
 * @returns {string} The resulting decrypted string.
 * @throws {Error} If a decryption error occurs.
 * 
 * @since 1.0.0
 * @category Type Decrypt
 * @public
*/
export type decryptType = (data: string, options?: {
    key?: string
} | undefined) => string


/**
 * Type definition for `base64Encode` function.
 * 
 * @param {string} input - The input string to be encoded.
 * @param {string} secretKey - An optional key for custom encoding. Default is 'abcdefghijklmnopqrstuvwxyz'.
 * @returns {string} Encoded string using a custom Base64 algorithm.
 * 
 * 
 * @since 1.0.5
 * @category Type Encrypt
 * @public
 */
export type base64EncodeType = (
    data: string,
    key?: string
) => string


/**
 * Type definition for `base64Decode` function.
 * 
 * @param {string} input - The Base64 encoded string to decode.
 * @param {string} secretKey - An optional key for custom decoding. Default is 'abcdefghijklmnopqrstuvwxyz'.
 * @returns {string} Decoded string using a custom Base64 algorithm.
 * 
 * @since 1.0.5
 * @category Type Decrypt
 * @public
 */
export type base64DecodeType = (
    data: string,
    key?: string
) => string


/**
 * Type definition for the `generateToken` function.
 * 
 * @param {number} length - The length of the token to generate.
 * @param {CharacterSetType} type_ - The type of character set to use for token generation.
 * @returns {string} The generated token.
 * 
 * @since 1.0.0
 * @category Type Token
 * @public
 */
export type tokenGeneratorType = (length: number, type_: CharacterSetType) => string

/**
 * Options to configure the comparison behavior in the `isEqual` function.
 *
 * @property {boolean} [caseSensitive=false] - Whether to perform case-sensitive comparison.
 * @property {string} [key] - An optional key for additional comparison.
 * @property {boolean} [log=false] - Whether to log the comparison result.
 * 
 * @since 1.0.0
 * @category Type Definitions
 * @public
 */
export type IsEqualOptions = {
    caseSensitive?: boolean // default false
    key?: string
    log?: boolean // default false
}

/**
 * Type definition for the `isEqual` function.
 * 
 * @param {string} text - The first string to compare.
 * @param {string} text1 - The second string to compare.
 * @param {IsEqualOptions} [options] - Optional configuration for the comparison.
 * @returns { isEqual: boolean, method?: string } A promise that resolves to an object containing the comparison result.
 * @throws {Error} If an error occurs during the comparison.
 * 
 * @since 1.0.0
 * @category Type Comparison
 * @public
 */
export type isEqualType = (text: string, text1: string, options?: IsEqualOptions | undefined) => {
    isEqual: boolean
    method?: string
}

/**
 * Represents a function type for encrypting or decrypting objects.
 *
 * @template T - An object type where keys are strings, and values are strings.
 * @param {T} data - The object containing values to be processed (encrypted or decrypted).
 * @param {string} [key] - An optional encryption or decryption key. Defaults to a predefined value if not provided.
 * @returns {T} The processed object with all values either encrypted or decrypted.
 * 
 * @example
 * Example usage for encryption:
 * const data = { username: 'JohnDoe', password: '12345' };
 * const encryptedData: Record<string, string> = encryptObject(data, 'my-secret-key');
 * 
 * Example usage for decryption:
 * const decryptedData: Record<string, string> = decryptObject(encryptedData, 'my-secret-key');
 *
 * @since 1.0.7
 * @category Types
 * @public
 */
export type cryptObject = <T extends Record<string, any>>(data: T, key?: string) => T