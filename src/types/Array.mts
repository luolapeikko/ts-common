import type {NonEmptyArray, NonEmptyReadonlyArray} from './NonEmptyArray.mjs';

/**
 * Array map function with overload for NonEmptyArray
 * @template T - The type of the array
 * @since v0.2.0
 */
export type AnyArrayType<T = unknown> = NonEmptyArray<T> | NonEmptyReadonlyArray<T> | T[] | readonly T[];

/**
 * Mapping type for "is" and "isNot" method names and return types for Core and Predicate classes.
 */
export type ArrayFnMapping = {
	'': [unknown[], AnyArrayType<unknown>];
	Empty: [unknown[], []];
};
