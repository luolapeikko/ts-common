import type {MappingShape} from './mapper.mjs';

/**
 * Predicate function helper type for checking if a value is of a specific type.
 */
export type PredIsFnUnknown<In, Out extends In> = (value: unknown) => value is Out;
/**
 * Predicate function helper type for checking if a value is of a specific type.
 */
export type PredIsFn<In, Out extends In, Inner = undefined> = <R extends Inner>(value: R) => value is Extract<R, Out>;
/**
 * Predicate function helper type for negating a predicate.
 */
export type PredIsNotFn<In, Out extends In, Inner = undefined> = <R extends Inner>(value: R) => value is Exclude<R, Out>;

export type WithIsPositivePredicates<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `is${Key}` : never]: () => PredIsFn<T[Key][0], T[Key][1]>;
};

export type WithIsNegativePredicates<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `isNot${Key}` : never]: () => PredIsNotFn<T[Key][0], T[Key][1]>;
};

export type WithIsPredicates<T extends MappingShape> = WithIsPositivePredicates<T> & WithIsNegativePredicates<T>;
