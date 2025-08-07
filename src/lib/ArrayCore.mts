import {type Loadable, LoadableCore} from '../index.mjs';
import {type NonEmptyArray, type NonEmptyReadonlyArray} from '../types/NonEmptyArray.mjs';

/**
 * Array map function with overload for NonEmptyArray
 * @template T - The type of the array
 * @since v0.2.0
 */
export type AnyArrayType<T = unknown> = NonEmptyArray<T> | NonEmptyReadonlyArray<T> | T[] | readonly T[];

/**
 * Array map callback function
 * @template Target - The type of the array to map to
 * @template Source - The type of the array to map from
 * @param value - The value to map
 * @param index - The index of the value in the array
 * @param array - The array being mapped
 * @since v0.2.0
 */
export type MapCallback<Target, Source extends AnyArrayType> = (value: Source[number], index: number, array: readonly Source[number][]) => Target;

export type MapCallback2<Target, Source> = (value: Source, index: number, array: readonly Source[]) => Target;

/**
 * Array core functions
 * @since v1.0.0
 */
export class ArrayCore {
	/**
	 * Array filter function with iterable which can be also iterable from a function callback.
	 * @example
	 * ArrayCore.filter(() => [1, 2, 3], (item) => item % 2 === 0); // [2]
	 * @template T The type of the array
	 * @param {Iterable<T> | (() => Iterable<T>)} list - The iterable to filter
	 * @param {(item: T, index: number, array: T[]) => boolean} predicate - The predicate function
	 * @returns {T[]} The filtered array
	 * @since v1.0.0
	 */
	public static filter<T>(list: Iterable<T> | (() => Iterable<T>), predicate: (item: T, index: number, array: T[]) => boolean): T[] {
		return Array.from(typeof list === 'function' ? list() : list).filter(predicate);
	}

	/**
	 * Async filter version of Array.prototype.filter(), with the same signature as its synchronous counterpart.
	 * @example
	 * ArrayCore.asyncFilter([1, 2, 3], (item) => Promise.resolve(item % 2 === 0)); // [2]
	 * @template T The type of the array
	 * @param {Loadable<Iterable<T>>} list - The iterable to filter
	 * @param {(item: T, index: number, array: T[]) => boolean | Promise<boolean>} asyncPredicate - The predicate function
	 * @returns {Promise<T[]>} A promise that resolves to the filtered array
	 * @since v1.0.0
	 */
	public static async asyncFilter<T>(
		list: Loadable<Iterable<T>>,
		asyncPredicate: (item: T, index: number, array: T[]) => boolean | Promise<boolean>,
	): Promise<T[]> {
		const array = Array.from(await LoadableCore.resolve(list));
		const results = await Promise.all(array.map(asyncPredicate));
		return array.filter((_, index) => results[index]);
	}

	/**
	 * Array map function with overload for NonEmptyArray
	 * @example
	 * const data = [{value: 'value'}] as const;
	 * const result1: NonEmptyReadonlyArray<'value'> = arrayMap(data, (value) => value.value); // pick type from data
	 * const result2: NonEmptyReadonlyArray<'value'> = arrayMap<'value', typeof data>(data, (value) => value.value); // enforce output type
	 * @template Target - The type of the array to map to
	 * @template Source - The type of the array to map from
	 * @param {Source} data - The array to map
	 * @param {MapCallback<Target, Source>} callback - Callback function to map data from the array
	 * @returns {AnyArrayType<Target>} Mapped array
	 * @since v1.0.0
	 */
	public static map<Target, Source extends NonEmptyArray<unknown> | NonEmptyReadonlyArray<unknown>>(
		data: Source,
		callback: MapCallback<Target, Source>,
	): NonEmptyArray<Target>;
	public static map<Target, Source extends unknown[] | readonly unknown[]>(data: Source, callback: MapCallback<Target, Source>): Target[];
	public static map<Target, Source extends AnyArrayType>(data: Source, callback: MapCallback<Target, Source>): AnyArrayType<Target> {
		return data.map(callback);
	}

	/**
	 * Type guard to check if a value is an array
	 * @param {unknown} array - The value to check
	 * @returns {boolean} True if the value is an array; otherwise, false
	 * @since v1.0.0
	 */
	public static is(array: unknown): array is AnyArrayType {
		return Array.isArray(array);
	}

	/**
	 * Type guard to check if a value is not an array
	 * @param {unknown} value - The value to check
	 * @returns {boolean} True if the value is not an array; otherwise, false
	 * @since v1.0.0
	 */
	public static isNot<T>(value: unknown): value is Exclude<T, AnyArrayType> {
		return !Array.isArray(value);
	}

	/**
	 * Assert that a value is an array
	 * @param {unknown} value - The value to check
	 * @throws {TypeError} If the value is not an array
	 * @since v1.0.0
	 */
	public static assert(value: unknown): asserts value is AnyArrayType {
		if (!Array.isArray(value)) {
			throw ArrayCore.buildErr(value);
		}
	}

	/**
	 * Assert that a value is NOT an array
	 * @param {unknown} value - The value to check
	 * @throws {TypeError} If the value is an array
	 * @since v1.0.0
	 */
	public static assertNot<T>(value: unknown): asserts value is Exclude<T, AnyArrayType> {
		if (Array.isArray(value)) {
			throw ArrayCore.buildErr(value);
		}
	}

	/**
	 * Type guard to check if an array is empty
	 * @param {unknown} array - The array to check
	 * @returns {boolean} True if the array is empty, false otherwise
	 * @since v1.0.0
	 */
	public static isEmpty(array: unknown): array is [] {
		return Array.isArray(array) && array.length === 0;
	}

	/**
	 * Type guard to check if an array is not empty
	 * @param {unknown} array - The array to check
	 * @returns {boolean} True if the array is not empty, false otherwise
	 * @since v1.0.0
	 */
	public static isNotEmpty<T>(array: unknown): array is NonEmptyArray<T> {
		return Array.isArray(array) && array.length > 0;
	}

	/**
	 * Builds an type error `Invalid Iterable: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v1.0.0
	 */
	public static buildErr(value: unknown): TypeError {
		return new TypeError(`Invalid Array: ${JSON.stringify(value)}`);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/* c8 ignore next 999 */

/**
 * Async filter version of Array.prototype.filter(), with the same signature as its synchronous counterpart.
 * @deprecated use {@link ArrayCore.asyncFilter} instead.
 * @example
 * asyncFilter([1, 2, 3], (item) => Promise.resolve(item % 2 === 0)); // [2]
 * @template T The type of the array
 * @param {Loadable<Iterable<T>>} list - The iterable to filter
 * @param {(item: T, index: number, array: T[]) => boolean | Promise<boolean>} asyncPredicate - The predicate function
 * @returns {Promise<T[]>} A promise that resolves to the filtered array
 * @since v0.3.7
 */
export async function asyncFilter<T>(
	list: Loadable<Iterable<T>>,
	asyncPredicate: (item: T, index: number, array: T[]) => boolean | Promise<boolean>,
): Promise<T[]> {
	return ArrayCore.asyncFilter(list, asyncPredicate);
}

/**
 * Array map function with overload for NonEmptyArray
 * @deprecated use {@link ArrayCore.map} instead.
 * @example
 * const data = [{value: 'value'}] as const;
 * const result1: NonEmptyReadonlyArray<'value'> = arrayMap(data, (value) => value.value); // pick type from data
 * const result2: NonEmptyReadonlyArray<'value'> = arrayMap<'value', typeof data>(data, (value) => value.value); // enforce output type
 * @template Target - The type of the array to map to
 * @template Source - The type of the array to map from
 * @param {Source} data - The array to map
 * @param {MapCallback<Target, Source>} callback - Callback function to map data from the array
 * @returns {AnyArrayType<Target>} Mapped array
 * @since v0.2.0
 */
export function arrayMap<Target, Source extends NonEmptyArray<unknown> | NonEmptyReadonlyArray<unknown>>(
	data: Source,
	callback: MapCallback<Target, Source>,
): NonEmptyArray<Target>;
export function arrayMap<Target, Source extends unknown[]>(data: Source, callback: MapCallback<Target, Source>): Target[];
export function arrayMap<Target, Source extends AnyArrayType>(data: Source, callback: MapCallback<Target, Source>): AnyArrayType<Target> {
	return ArrayCore.map(data as any, callback);
}
