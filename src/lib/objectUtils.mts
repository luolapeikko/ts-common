import {type NonEmptyReadonlyArray} from '../types/NonEmptyArray.mjs';
import {type RecordHaveWritableKeys} from '../types/object.mjs';

/**
 * Type for an empty object
 * @since v0.2.0
 */
export type EmptyObject = Record<string | number | symbol, never>;

/**
 * Type mapping for Object.keys, Object.values
 * 1. if R is an empty object, return type `[]`
 * 2. if R has no writable keys, return type `NonEmptyReadonlyArray<T>`
 * 3. otherwise, return type `Array<T>`
 * @since v0.2.0
 */
export type ObjectMappedArray<R extends Record<string | number | symbol, unknown>, T> = R extends EmptyObject
	? []
	: RecordHaveWritableKeys<R> extends never
		? NonEmptyReadonlyArray<T>
		: Array<T>;

/**
 * Type mapping for Object.entries as an array of tuples
 * 1. if R is an empty object, return type `[]`
 * 2. if R has no writable keys, return type `NonEmptyReadonlyArray<[K1, V1] | [K2, V2] | ...>`
 * 3. otherwise, return type `Array<[K1, V1] | [K2, V2] | ...>`
 * @since v0.2.5
 */
export type ObjectMappedArrayTuples<R extends Record<string | number | symbol, unknown>> = R extends EmptyObject
	? []
	: RecordHaveWritableKeys<R> extends never
		? NonEmptyReadonlyArray<
				{
					[K in keyof R]: [K, R[K]];
				}[keyof R]
			>
		: Array<
				{
					[K in keyof R]: [K, R[K]];
				}[keyof R]
			>;

/**
 * Type-safe Object.entries() with overload for NonEmptyArray
 * @example
 * const result1: NonEmptyReadonlyArray<['key', 'value']> = objectEntries({key: 'value'} as const);
 * const result2: Array<['key', string]> = objectEntries({key: 'value'});
 * const result3: Array<[string, string]> = objectEntries<Record<string, string>>({key: 'value'});
 * const result4: [] = objectEntries({});
 * @template R - The object shape
 * @param value - The object shape to get the values from
 * @return {Array<[Key, Value]> | NonEmptyArray<[Key, Value]>} Array of tuples with key and value
 * @since v0.2.0
 */
export function objectEntries<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArrayTuples<R> {
	return Object.entries(value) as ObjectMappedArrayTuples<R>;
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
