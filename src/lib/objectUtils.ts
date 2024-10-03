import {type NonEmptyReadonlyArray} from '../types/NonEmptyArray.js';
import {type RecordHaveWritableKeys} from '../types/object.js';

/**
 * Type for an empty object
 * @since v0.2.0
 */
export type EmptyObject = Record<string | number | symbol, never>;

/**
 * Type  mapping for Object.entries, Object.keys, Object.values
 * 1. if R is an empty object, return []
 * 2. if R has no writable keys, return NonEmptyReadonlyArray<T>
 * 3. otherwise, return Array<T>
 * @since v0.2.0
 */
export type ObjectMappedArray<R extends Record<string | number | symbol, unknown>, T> = R extends EmptyObject
	? []
	: RecordHaveWritableKeys<R> extends never
		? NonEmptyReadonlyArray<T>
		: Array<T>;

/**
 * Type-safe Object.entries() with overload for NonEmptyArray
 * @example
 * const result1: NonEmptyReadonlyArray<['key', 'value']> = objectEntries({key: 'value'} as const);
 * const result2: Array<['key', string]> = objectEntries({key: 'value'});
 * const result3: Array<[string, string]> = objectEntries<Record<string, string>>({key: 'value'});
 * const result4: [] = objectEntries({});
 * @template R - The object shape
 * @param value - The object shape to get the values from
 * @returns {Array<[Key, Value]> | NonEmptyArray<[Key, Value]>} Array of tuples with key and value
 * @since v0.2.0
 */
export function objectEntries<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArray<R, [keyof R, R[keyof R]]> {
	return Object.entries(value) as ObjectMappedArray<R, [keyof R, R[keyof R]]>;
}

/**
 * Type-safe Object.keys() with overload for NonEmptyArray
 * @example
 * const result1: NonEmptyReadonlyArray<'key'> = objectKeys({key: 'value'} as const);
 * const result2: Array<'key'> = objectKeys({key: 'value'});
 * const result3: Array<string> = objectKeys<Record<string, string>>({key: 'value'});
 * const result4: [] = objectKeys({});
 * @template R - The object shape
 * @param value - The object shape to get the values from
 * @returns {Array<Key> | NonEmptyReadonlyArray<Key>} Array of object keys
 * @since v0.2.0
 */
export function objectKeys<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArray<R, keyof R> {
	return Object.keys(value) as ObjectMappedArray<R, keyof R>;
}
/**
 * Type-safe Object.values() with overload for NonEmptyArray
 * @example
 * const result1: NonEmptyReadonlyArray<'value'> = objectValues({key: 'value'} as const);
 * const result2: Array<string> = objectValues({key: 'value'});
 * const result3: [] = objectValues({});
 * @template R - The object shape
 * @param value - The object shape to get the values from
 * @returns {Array<Value> | NonEmptyReadonlyArray<Value>} Array of object values
 * @since v0.2.0
 */
export function objectValues<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArray<R, R[keyof R]> {
	return Object.values(value) as ObjectMappedArray<R, R[keyof R]>;
}
