import {type NonEmptyReadonlyArray} from '../types/NonEmptyArray.mjs';
import {type RecordHaveWritableKeys} from '../types/object.mjs';

/**
 * Type for an empty object
 * @since v0.2.0
 */
export type EmptyObject = Record<string | number | symbol, never>;

/**
 * Type mapping for Object.keys, Object.values
 *
 * 1. if R is an empty object, return type `[]`
 * 2. if R has no writable keys, return type `NonEmptyReadonlyArray<T>`
 * 3. otherwise, return type `Array<T>`
 * @template R - The object shape
 * @template T - The type of the values
 * @since v0.2.0
 */
export type ObjectMappedArray<R extends Record<string | number | symbol, unknown>, T> = R extends EmptyObject
	? []
	: RecordHaveWritableKeys<R> extends never
		? NonEmptyReadonlyArray<T>
		: Array<T>;

/**
 * Type mapping for Object.entries as an array of tuples
 *
 * 1. if R is an empty object, return type `[]`
 * 2. if R has no writable keys, return type `NonEmptyReadonlyArray<[K1, V1] | [K2, V2] | ...>`
 * 3. otherwise, return type `Array<[K1, V1] | [K2, V2] | ...>`
 * @template R - The object shape
 * @template T - The type of the values
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
 * @param {R} value - The object shape to get the values from
 * @returns {ObjectMappedArrayTuples<R>} Array of tuples with key and value
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
 * @param {R} value - The object shape to get the values from
 * @returns {ObjectMappedArray<R, keyof R>} Array of object keys
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
 * @param {R} value - The object shape to get the values from
 * @returns {ObjectMappedArray<R, R[keyof R]>} Array of object values
 * @since v0.2.0
 */
export function objectValues<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArray<R, R[keyof R]> {
	return Object.values(value) as ObjectMappedArray<R, R[keyof R]>;
}

type KeyCallback<O extends Record<PropertyKey, any>, K extends keyof O> = (key: K, value: O[K], object: O) => boolean;

/**
 * Filter and include specific keys from an object (Based on https://github.com/sindresorhus/filter-obj)
 * @example
 * const object = {
 *   foo: true,
 *   bar: false
 * };
 * const newObject = includeKeys(object, (key, value, obj) => value === true); //=> {foo: true}
 * const newObject = includeKeys(object, ['bar']); //=> {bar: false}
 * @template O - The object to filter and include keys from
 * @template K - The key type
 * @param {O} object - The object to filter and include keys from
 * @param {Iterable<K> | KeyCallback<O, K>} keys - The keys or keysCallback to include from the object
 * @returns {Partial<O>} A new object with the included keys
 * @since v0.2.8
 */
export function includeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keys: Iterable<K>): Pick<O, K>;
export function includeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyCallback: KeyCallback<O, K>): Partial<O>;
export function includeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyOrCallback: Iterable<K> | KeyCallback<O, K>): Partial<O> {
	const isCallback = typeof keyOrCallback === 'function';
	const keys = isCallback ? Reflect.ownKeys(object) : Array.from(keyOrCallback);
	const result = keys.reduce<Partial<O>>((acc, key) => {
		const descriptor = Object.getOwnPropertyDescriptor(object, key);
		if (!descriptor?.enumerable) {
			return acc;
		}
		if (isCallback) {
			if (keyOrCallback(key as K, object[key as K], object)) {
				Object.defineProperty(acc, key, descriptor);
			}
		} else {
			Object.defineProperty(acc, key, descriptor);
		}
		return acc;
	}, {});
	return Object.setPrototypeOf(result, Object.getPrototypeOf(object) as object | null) as Partial<O>;
}

type DistributiveOmit<Value, Key extends PropertyKey> = Value extends unknown ? Omit<Value, Key> : never;

/**
 * Filter and exclude specific keys from an object (Based on https://github.com/sindresorhus/filter-obj)
 * @example
 * const object = {
 *   foo: true,
 *   bar: false
 * };
 * const newObject = excludeKeys(object, (key, value) => value === true); //=> {bar: false}
 * const newObject = excludeKeys(object, ['bar']); //=> {foo: true}
 * @template O - The object to filter and exclude keys from
 * @template K - The key type
 * @param {O} object - The object to filter and exclude keys from
 * @param {Iterable<K> | KeyCallback<O, K>} key - The keys or keysCallback to exclude from the object
 * @returns {Partial<O>} A new object with the excluded keys
 * @since v0.2.8
 */
export function excludeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, key: Iterable<K>): DistributiveOmit<O, K>;
export function excludeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyCallback: KeyCallback<O, K>): Partial<O>;
export function excludeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyOrCallback: Iterable<K> | KeyCallback<O, K>): Partial<O> {
	if (typeof keyOrCallback === 'function') {
		return includeKeys(object, (key, value, object) => !keyOrCallback(key as K, value as O[K], object));
	}
	const keySet = new Set(keyOrCallback);
	return includeKeys(object, (key) => !keySet.has(key as K));
}
