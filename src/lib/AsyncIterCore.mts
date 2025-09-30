import type {CoreResult} from '../types/core.mjs';
import {valueErrorBuilder} from './errorUtils.mjs';

type InferAsyncIterable<V> = V extends AsyncIterable<infer T> ? AsyncIterable<T> : never;

/**
 * The core iteration functions.
 * @since v1.1.3
 */
export class AsyncIterCore {
	/**
	 * Creates a {@link CoreResult} object which contains the result of the validation check.
	 * @template T - The type of the value to check.
	 * @param {unknown} value - The value to check.
	 * @returns {CoreResult<InferAsyncIterable<V>, TypeError>} Core Result object.
	 * @since v1.1.3
	 */
	public static result<V>(value: V): CoreResult<InferAsyncIterable<V>, TypeError> {
		return typeof value === 'object' && value !== null && typeof (value as InferAsyncIterable<V>)?.[Symbol.asyncIterator] === 'function'
			? {success: true, data: value as InferAsyncIterable<V>}
			: {success: false, error: valueErrorBuilder(value, 'AsyncIterable', false)};
	}

	/**
	 * Type guard that checks if a value is an async iterable object.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for async iterability.
	 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.1.3
	 */
	public static is<T>(value: unknown): value is AsyncIterable<T> {
		return AsyncIterCore.result(value).success;
	}

	/**
	 * Type guard that checks if a value is not an async iterable object.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for non-async iterability.
	 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.1.3
	 */
	public static isNot<T>(value: unknown): value is Exclude<unknown, AsyncIterable<T>> {
		return !AsyncIterCore.result(value).success;
	}

	/**
	 * Asserts that the given value is an async iterable.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check.
	 * @returns {AsyncIterable<T>} The value as an async iterable.
	 * @throws {TypeError} If the value is not an async iterable.
	 * @since v1.1.3
	 */
	public static assert<T>(value: unknown): asserts value is AsyncIterable<T> {
		const res = AsyncIterCore.result(value);
		if (!res.success) {
			throw res.error;
		}
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/* c8 ignore next 999 */

/**
 * Type guard that checks if a value is an async iterable object.
 * @deprecated Will be removed in `v1.2.0`, {@link AsyncIterCore.is} instead
 * @template T - The type of elements contained in the async iterable.
 * @param {unknown} value - The value to check for async iterability.
 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
	return AsyncIterCore.is(value);
}

/**
 * Type guard that checks if a value is not an async iterable object.
 * @deprecated Will be removed in `v1.2.0`, {@link AsyncIterCore.isNot} instead
 * @template T - The type of elements contained in the async iterable.
 * @param {unknown} value - The value to check for non-async iterability.
 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isNotAsyncIterable<T>(value: unknown): value is Exclude<unknown, AsyncIterable<T>> {
	return AsyncIterCore.isNot(value);
}
