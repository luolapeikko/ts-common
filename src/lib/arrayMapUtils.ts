import {type NonEmptyArray, type NonEmptyReadonlyArray} from '../types/NonEmptyArray';

/**
 * Array map function with overload for NonEmptyArray
 * @param data - The array to map
 * @param callback - Callback function to map data from the array
 */
export function arrayMap<T, S>(
	data: NonEmptyReadonlyArray<S> | NonEmptyArray<S>,
	callback: (value: S, index: number, array: NonEmptyReadonlyArray<S>) => T,
): NonEmptyArray<T>;
export function arrayMap<T, S>(data: S[], callback: (value: S, index: number, array: S[]) => T): Array<T>;
export function arrayMap<T, S>(
	data: S[] | NonEmptyReadonlyArray<S>,
	callback: (value: S, index: number, array: S | readonly S[]) => T,
): Array<T> | NonEmptyReadonlyArray<T> {
	return data.map(callback);
}
