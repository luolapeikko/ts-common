import type {CoreResult} from '../types/core.mjs';
import {AsyncIterCore} from './AsyncIterCore.mjs';
import {valueErrorBuilder} from './errorUtils.mjs';

type InferIterable<V> = V extends Iterable<infer T> ? Iterable<T> : never;
type InferAsyncIterable<V> = V extends AsyncIterable<infer T> ? AsyncIterable<T> : never;

/**
 * The core iteration functions.
 * @since v1.0.0
 */
export class IterCore {
	/**
	 * Creates a {@link CoreResult} object which contains the result of the validation check.
	 * @template T - The type of the value to check.
	 * @param {unknown} value - The value to check.
	 * @returns {CoreResult<InferIterable<V>, TypeError>} Core Result object.
	 * @since v1.1.3
	 */
	public static iterableResult<V>(value: V): CoreResult<InferIterable<V>, TypeError> {
		return typeof value === 'object' && value !== null && typeof (value as InferIterable<V>)?.[Symbol.iterator] === 'function'
			? {success: true, data: value as InferIterable<V>}
			: {success: false, error: IterCore.buildValueErr(value, 'Iterable')};
	}

	/**
	 * Creates a {@link CoreResult} object which contains the result of the validation check.
	 * @deprecated Will be removed in `v1.2.0`, use {@link AsyncIterCore.result} instead
	 * @template T - The type of the value to check.
	 * @param {unknown} value - The value to check.
	 * @returns {CoreResult<InferAsyncIterable<V>, TypeError>} Core Result object.
	 * @since v1.1.3
	 */
	public static asyncIterableResult<V>(value: V): CoreResult<InferAsyncIterable<V>, TypeError> {
		return AsyncIterCore.result(value);
	}

	/**
	 * Type guard that checks if a value is an iterable object.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for iterability.
	 * @returns {boolean} `true` if the value implements the `Iterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isIterable<T>(value: unknown): value is Iterable<T> {
		return IterCore.iterableResult(value).success;
	}

	/**
	 * Type guard that checks if a value is an async iterable object.
	 * @deprecated Will be removed in `v1.2.0`, use {@link AsyncIterCore.is} instead
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for async iterability.
	 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
		return AsyncIterCore.is(value);
	}

	/**
	 * Type guard that checks if a value is not an iterable object.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for non-iterability.
	 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isNotIterable<T>(value: unknown): value is Exclude<unknown, Iterable<T>> {
		return !IterCore.iterableResult(value).success;
	}

	/**
	 * Type guard that checks if a value is not an async iterable object.
	 * @deprecated Will be removed in `v1.2.0`, use {@link AsyncIterCore.isNot} instead
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for non-async iterability.
	 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isNotAsyncIterable<T>(value: unknown): value is Exclude<unknown, AsyncIterable<T>> {
		return AsyncIterCore.isNot(value);
	}

	/**
	 * Asserts that the given value is an iterable.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check.
	 * @returns {Iterable<T>} The value as an iterable.
	 * @throws {TypeError} If the value is not an iterable.
	 * @since v1.0.0
	 */
	public static assertIterable<T>(value: unknown): asserts value is Iterable<T> {
		const res = IterCore.iterableResult(value);
		if (!res.success) {
			throw res.error;
		}
	}

	/**
	 * Asserts that the given value is an async iterable.
	 * @deprecated Will be removed in `v1.2.0`, use {@link AsyncIterCore.assert} instead
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check.
	 * @returns {AsyncIterable<T>} The value as an async iterable.
	 * @throws {TypeError} If the value is not an async iterable.
	 * @since v1.0.0
	 */
	public static assertAsyncIterable<T>(value: unknown): asserts value is AsyncIterable<T> {
		AsyncIterCore.assert(value);
	}

	/**
	 * Checks if the iterable contains the specified value.
	 * @example
	 * const values = ['a', 'b', 'c'] as const;
	 * IterCore.oneOf(values, 'a'); // true
	 * IterCore.oneOf(values, 'd'); // false
	 * @template T The type of elements contained in the iterable.
	 * @param {Iterable<T>} iterables - The iterable to check.
	 * @param {T} value - The value to check for.
	 * @returns {boolean} `true` if the iterable contains the value; otherwise, `false`.
	 * @since v1.1.3
	 */
	public static oneOf<T>(iterables: Iterable<T>, value: T): boolean {
		for (const iterable of iterables) {
			if (iterable === value) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Checks if the iterable does not contain the specified value.
	 * @example
	 * const values = ['a', 'b', 'c'] as const;
	 * IterCore.notOneOf(values, 'a'); // false
	 * IterCore.notOneOf(values, 'd'); // true
	 * @template T The type of elements contained in the iterable.
	 * @param {Iterable<T>} iterables - The iterable to check.
	 * @param {T} value - The value to check for.
	 * @returns {boolean} `true` if the iterable does not contain the value; otherwise, `false`.
	 * @since v1.1.3
	 */
	public static notOneOf<T>(iterables: Iterable<T>, value: T): boolean {
		return !IterCore.oneOf(iterables, value);
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {'Number' | 'Integer' | 'Float' | 'BigInt'} typeName - The expected type name.
	 * @param {boolean} [isNot] - Whether the error should be for `!${typeName}`.
	 * @returns {TypeError} The created error.
	 * @since v1.1.3
	 */
	public static buildValueErr(value: unknown, typeName: 'Iterable' | 'AsyncIterable', isNot = false): TypeError {
		return valueErrorBuilder(value, typeName, isNot);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/* c8 ignore next 999 */

/**
 * Type guard that checks if a value is an iterable object.
 * @deprecated Will be removed in `v1.2.0`, {@link IterCore.isIterable} instead
 * @template T - The type of elements contained in the iterable.
 * @param {unknown} value - The value to check for iterability.
 * @returns {boolean} `true` if the value implements the `Iterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isIterable<T>(value: unknown): value is Iterable<T> {
	return IterCore.isIterable(value);
}

/**
 * Type guard that checks if a value is not an iterable object.
 * @deprecated Will be removed in `v1.2.0`, {@link IterCore.isNotIterable} instead
 * @template T - The type of elements contained in the iterable.
 * @param {unknown} value - The value to check for non-iterability.
 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isNotIterable<T>(value: unknown): value is Exclude<unknown, Iterable<T>> {
	return IterCore.isNotIterable(value);
}
