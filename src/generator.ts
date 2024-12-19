import type { CharacterSetType } from './types'

export const characterSets: Record<CharacterSetType, string> = {
    defaultSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    set1: '0123456789',
    set2: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
}

/**
 * Generates a random token string of specified length using the given character set
 * 
 * @param {number} length - The desired length of the generated token
 * @param {CharacterSetType} type_ - The character set to use for generation
 * @returns {string} A random token string
 * @throws {Error} If token generation fails
 * 
 * @example
 * tokenGenerator(8, 'defaultSet') // Returns something like "Kj9mP2nX"
 * 
 * @since 1.0.0
 * @category Generator
 * @public
 */
export const tokenGenerator: (length: number, type_: CharacterSetType) => string = (length: number, type_: CharacterSetType): string => {
    let token: string = ''
    const characterSet: any = characterSets[type_] || characterSets.defaultSet
    for (let i: number = 0; i < length; i++) {
        token += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
    }
    do {
        var _token_: any = token.split('')
        if (_token_[0] === '0') {
            _token_[0] = characterSet.charAt(Math.floor(Math.random() * characterSet.length))
        }
        if (token.length < length) {
            token += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
        }
    } while (_token_[0] === '0' || token.length !== length)
    return _token_.join('')
}