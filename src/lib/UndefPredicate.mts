/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {PredIsFn, PredIsNotFn, WithIsPredicates} from '../types/predicate.mjs';
import type {UndefFnMapping} from '../types/Undef.mjs';
import {UndefCore} from './UndefCore.mjs';

export class UndefPredicate {
	/**
	 * Checks if the given value is a `null`.
	 * @example
	 * const values = [123, "hello", null];
	 * const filtered = values.filter(UndefPredicate.isNull());
	 * console.log(filtered); // [null]
	 * @returns {function} A predicate function that checks if the value is a `null`.
	 * @since v1.0.6
	 */
	public static isNull<T extends unknown>(): PredIsFn<null, null, T> {
		return <R extends T>(value: R): value is Extract<R, null> => UndefCore.isNull<R>(value);
	}

	/**
	 * Checks if the given value is not a `null`.
	 * @example
	 * const values = [123, "hello", null] as const;
	 * const nonNulls = values.filter(UndefPredicate.isNotNull());
	 * console.log(nonNulls); // [123, "hello"]
	 * @returns {function} A predicate function that checks if the value is not a `null`.
	 * @since v1.0.6
	 */
	public static isNotNull<T extends unknown>(): PredIsNotFn<null, null, T> {
		return <R extends T>(value: R): value is Exclude<R, null> => UndefCore.isNotNull<R>(value);
	}

	/**
	 * Checks if the given value is `undefined`.
	 * @example
	 * const values = [123, "hello", undefined];
	 * const filtered = values.filter(UndefPredicate.isUndefined());
	 * console.log(filtered); // [undefined]
	 * @returns {function} A predicate function that checks if the value is `undefined`.
	 * @since v1.0.6
	 */
	public static isUndefined<T extends unknown>(): PredIsFn<undefined, undefined, T> {
		return <R extends T>(value: R): value is Extract<R, undefined> => UndefCore.isUndefined<R>(value);
	}

	/**
	 * Checks if the given value is not `undefined`.
	 * @example
	 * const values = [123, "hello", undefined] as const;
	 * const filtered = values.filter(UndefPredicate.isNotUndefined());
	 * console.log(filtered); // [123, "hello"]
	 * @returns {function} A predicate function that checks if the value is not `undefined`.
	 * @since v1.0.6
	 */
	public static isNotUndefined<T extends unknown>(): PredIsNotFn<undefined, undefined, T> {
		return <R extends T>(value: R): value is Exclude<R, undefined> => UndefCore.isNotUndefined<R>(value);
	}

	/**
	 * Checks if the given value is `null` or `undefined`.
	 * @example
	 * const values = [123, "hello", null, undefined];
	 * const nullishValues = values.filter(UndefPredicate.isNullish());
	 * console.log(nullishValues); // [null, undefined]
	 * @returns {function} A predicate function that checks if the value is `null` or `undefined`.
	 * @since v1.0.6
	 */
	public static isNullish<T extends unknown>(): PredIsFn<null | undefined, null | undefined, T> {
		return <R extends T>(value: R): value is Extract<R, null | undefined> => UndefCore.isNullish<R>(value);
	}

	/**
	 * Checks if the given value is not `null` or `undefined`.
	 * @example
	 * const values = [123, "hello", null, undefined] as const;
	 * const nonNullishValues = values.filter(UndefPredicate.isNotNullish());
	 * console.log(nonNullishValues); // [123, "hello"]
	 * @returns {function} A predicate function that checks if the value is not `null` or `undefined`.
	 * @since v1.0.6
	 */
	public static isNotNullish<T extends unknown>(): PredIsNotFn<null | undefined, null | undefined, T> {
		return <R extends T>(value: R): value is Exclude<R, null | undefined> => UndefCore.isNotNullish<R>(value);
	}
}

/**
 * Check that we have all methods implemented
 */
type BaseType = WithIsPredicates<UndefFnMapping>;
void 0 as unknown as typeof UndefPredicate satisfies BaseType;
