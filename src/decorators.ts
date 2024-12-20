import 'reflect-metadata'
import { FieldDecoratorType, getFieldMetadataType } from './types'

/**
 * Decorator that marks class properties for metadata storage and reflection.
 * Used to annotate properties that require special handling or processing,
 * particularly useful in scenarios like HTTP request body validation,
 * serialization, or data transformation.
 * 
 * @decorator
 * @returns {PropertyDecorator} A decorator function that adds metadata to the property
 * 
 * @example
 * class UserDTO {
 *   @Field()
 *   username: string = '' // default value
 * 
 *   @Field()
 *   email: string = '' // default value
 * 
 *   @Field()
 *   age: number = 18 // default value
 * }
 * 
 * @since 1.0.9
 * @category Decorators
 */
export const Field: FieldDecoratorType = (): PropertyDecorator => {
    return (target: object, propertyKey: string | symbol): void => {
        const existingFields = Reflect.getMetadata('fields', target) || []
        Reflect.defineMetadata('fields', [...existingFields, propertyKey], target)
    }
}

/**
 * Retrieves metadata for all properties decorated with @Field from a class instance
 * or constructor. Useful for reflection-based operations like validation,
 * serialization, or dynamic property processing.
 * 
 * @param {object} target - The class instance or constructor to inspect
 * @returns {(string | symbol)[]} Array of property keys that were decorated with @Field
 * @throws {Error} If metadata reflection fails
 * 
 * @example
 * const user = new UserDTO()
 * const fields = getFieldMetadata(user) // [ { field: 'username', type: 'string' }, { field: 'password', type: 'string' }, { field: 'age', type: 'number' } ]
 *
 * 
 * @since 1.0.9
 * @category Reflection
 */
export const getFieldMetadata: getFieldMetadataType = <T>(target: Record<string, any>): { field: T, type: string }[] => {
    const fieldds: T = Reflect.getMetadata('fields', target) || []
    return (fieldds as T[]).map((f): { field: T, type: any } => ({ field: f, type: typeof target[f as string] != 'object' ? typeof target[f as string] : Array.isArray(target[f as string]) ? 'array' : 'object' }))
}