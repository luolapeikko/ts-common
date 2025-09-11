import {type IfReadonlyKeys, type IfWritableKeys} from './helper.mjs';
import {type NonEmptyReadonlyArray} from './NonEmptyArray.mjs';

/**
 * Check if a record is readonly or never
 * @template R - The object shape
 * @since v0.1.2
 */
export type RecordHaveReadonlyKeys<R extends object> = IfReadonlyKeys<R> extends never ? never : R;

/**
 * Check if a record is non-readonly or never
 * @template R - The object shape
 * @since v0.1.2
 */
export type RecordHaveWritableKeys<R extends object> = IfWritableKeys<R> extends never ? never : R;

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
export type ObjectMappedArray<R extends object, T> = R extends EmptyObject ? [] : RecordHaveWritableKeys<R> extends never ? NonEmptyReadonlyArray<T> : T[];

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
export type ObjectMappedArrayTuples<R extends object> = R extends EmptyObject
	? []
	: RecordHaveWritableKeys<R> extends never
		? NonEmptyReadonlyArray<
				{
					[K in keyof R]-?: [K, Exclude<R[K], undefined>];
				}[keyof R]
			>
		: {
				[K in keyof R]-?: [K, Exclude<R[K], undefined>];
			}[keyof R][];

export type MutableRecord<T> = {
	-readonly [K in keyof T]: T[K];
};
