import type {WithAssertCore, WithFromCore, WithIsCore} from '../types/core.mjs';
import type {IterFnMapping} from '../types/Iter.mjs';
import {errorBuilder} from './errorUtils.mjs';
import {TypeCore} from './TypeCore.mjs';

/**
 * The core iteration functions.
 * @since v1.0.0
 */
export class IterCore {
	public static from(value: null | undefined | Iterable<unknown>): Iterable<unknown> {
		IterCore.assert(value);
		return value;
	}

	public static asyncFrom(value: null | undefined | AsyncIterable<unknown>): AsyncIterable<unknown> {
		IterCore.assertAsync(value);
		return value;
	}

	/**
	 * Type guard that checks if a value is an iterable object.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for iterability.
	 * @param {boolean} [excludePrimitive=false] - Whether to exclude primitive types from the check. (string)
	 * @returns {boolean} `true` if the value implements the `Iterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static is(value: unknown, excludePrimitive?: boolean): value is Iterable<unknown>;
	public static is<T>(value: T, excludePrimitive?: boolean): value is Extract<T, Iterable<unknown>>;
	public static is(value: unknown, excludePrimitive = false): value is Iterable<unknown> {
		if (excludePrimitive && TypeCore.isPrimitive(value)) {
			return false;
		}
		return value != null && typeof (value as Iterable<unknown>)[Symbol.iterator] === 'function';
	}

	/**
	 * Type guard that checks if a value is not an iterable object.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for non-iterability.
	 * @param {boolean} [excludePrimitive=false] - Whether to exclude primitive types from the check. (string)
	 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isNot<T>(value: T, excludePrimitive = false): value is Exclude<T, Iterable<unknown>> {
		return !IterCore.is<T>(value, excludePrimitive);
	}

	/**
	 * Type guard that checks if a value is an async iterable object.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for async iterability.
	 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isAsync(value: unknown): value is AsyncIterable<unknown>;
	public static isAsync<T>(value: T): value is Extract<T, AsyncIterable<unknown>>;
	public static isAsync(value: unknown): value is AsyncIterable<unknown> {
		return value != null && typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === 'function';
	}

	/**
	 * Type guard that checks if a value is not an async iterable object.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for non-async iterability.
	 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isNotAsync<T>(value: T): value is Exclude<T, AsyncIterable<unknown>> {
		return !IterCore.isAsync(value);
	}

	public static assert(value: unknown): asserts value is Iterable<unknown> {
		if (IterCore.isNot(value)) {
			throw IterCore.buildErr(value, 'Iterable');
		}
	}

	public static assertNot<T>(value: T): asserts value is Exclude<T, Iterable<unknown>> {
		if (IterCore.is(value)) {
			throw IterCore.buildErr(value, 'NotIterable');
		}
	}

	/**
	 * Asserts that the given value is an async iterable.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check.
	 * @returns {AsyncIterable<T>} The value as an async iterable.
	 * @throws {TypeError} If the value is not an async iterable.
	 * @since v1.0.0
	 */
	public static assertAsync(value: unknown): asserts value is AsyncIterable<unknown> {
		if (IterCore.isNotAsync(value)) {
			throw IterCore.buildErr(value, 'AsyncIterable');
		}
	}

	public static assertNotAsync<T>(value: T): asserts value is Exclude<T, AsyncIterable<unknown>> {
		if (IterCore.isAsync(value)) {
			throw IterCore.buildErr(value, 'NotAsyncIterable');
		}
	}

	public static buildErr(value: unknown, typeName: 'Iterable' | 'AsyncIterable' | 'NotIterable' | 'NotAsyncIterable'): TypeError {
		return errorBuilder(value, typeName);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

void 0 as unknown as typeof IterCore satisfies WithIsCore<IterFnMapping> & WithFromCore<IterFnMapping> & WithAssertCore<IterFnMapping>;

/* c8 ignore next 999 */

/**
 * Type guard that checks if a value is an iterable object.
 * @deprecated Use {@link IterCore.is} instead
 * @template T - The type of elements contained in the iterable.
 * @param {unknown} value - The value to check for iterability.
 * @returns {boolean} `true` if the value implements the `Iterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isIterable<T>(value: unknown): value is Iterable<T> {
	return IterCore.is(value);
}

/**
 * Type guard that checks if a value is not an iterable object.
 * @deprecated Use {@link IterCore.isNotIterable} instead
 * @template T - The type of elements contained in the iterable.
 * @param {unknown} value - The value to check for non-iterability.
 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isNotIterable<T>(value: unknown): value is Exclude<unknown, Iterable<T>> {
	return IterCore.isNot(value);
}

/**
 * Type guard that checks if a value is an async iterable object.
 * @deprecated Use {@link IterCore.isAsyncIterable} instead
 * @template T - The type of elements contained in the async iterable.
 * @param {unknown} value - The value to check for async iterability.
 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
	return IterCore.isAsync(value);
}

/**
 * Type guard that checks if a value is not an async iterable object.
 * @deprecated Use {@link IterCore.isNotAsyncIterable} instead
 * @template T - The type of elements contained in the async iterable.
 * @param {unknown} value - The value to check for non-async iterability.
 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isNotAsyncIterable<T>(value: unknown): value is Exclude<unknown, AsyncIterable<T>> {
	return IterCore.isNotAsync(value);
}
