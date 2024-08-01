import {type NonEmptyArray, type NonEmptyReadonlyArray} from '../types/NonEmptyArray';

type AnyArrayType<T = unknown> = NonEmptyArray<T> | NonEmptyReadonlyArray<T> | Array<T>;

type MapCallback<Target, Source extends AnyArrayType> = (value: Source[number], index: number, array: readonly Source[number][]) => Target;

/**
 * Array map function with overload for NonEmptyArray
 * @example
 * const data = [{value: 'value'}] as const;
 * const result1: NonEmptyReadonlyArray<'value'> = arrayMap(data, (value) => value.value); // pick type from data
 * const result2: NonEmptyReadonlyArray<'value'> = arrayMap<'value', typeof data>(data, (value) => value.value); // enforce output type
 * @template Target - The type of the array to map to
 * @template Source - The type of the array to map from
 * @param data - The array to map
 * @param callback - Callback function to map data from the array
 */
export function arrayMap<Target, Source extends NonEmptyArray<unknown> | NonEmptyReadonlyArray<unknown>>(
	data: Source,
	callback: MapCallback<Target, Source>,
): NonEmptyArray<Target>;
export function arrayMap<Target, Source extends Array<unknown>>(data: Source, callback: MapCallback<Target, Source>): Array<Target>;
export function arrayMap<Target, Source extends AnyArrayType>(data: Source, callback: MapCallback<Target, Source>): AnyArrayType<Target> {
	return data.map(callback);
}
