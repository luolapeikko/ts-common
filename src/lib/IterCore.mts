/**
 * The core iteration functions.
 * @since v1.0.0
 */
export class IterCore {
	/**
	 * Type guard that checks if a value is an iterable object.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for iterability.
	 * @returns {boolean} `true` if the value implements the `Iterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isIterable<T>(value: unknown): value is Iterable<T> {
		return value != null && typeof (value as Iterable<T>)[Symbol.iterator] === 'function';
	}

	public static assertIterable<T>(value: unknown): Iterable<T> {
		if (IterCore.isNotIterable(value)) {
			throw IterCore.buildIterableErr(value);
		}
		return value;
	}

	/**
	 * Type guard that checks if a value is not an iterable object.
	 * @template T - The type of elements contained in the iterable.
	 * @param {unknown} value - The value to check for non-iterability.
	 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isNotIterable<T>(value: unknown): value is Exclude<unknown, Iterable<T>> {
		return !IterCore.isIterable(value);
	}

	/**
	 * Type guard that checks if a value is an async iterable object.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for async iterability.
	 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
		return value != null && typeof (value as AsyncIterable<T>)[Symbol.asyncIterator] === 'function';
	}

	/**
	 * Asserts that the given value is an async iterable.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check.
	 * @returns {AsyncIterable<T>} The value as an async iterable.
	 * @throws {TypeError} If the value is not an async iterable.
	 * @since v1.0.0
	 */
	public static assertAsyncIterable<T>(value: unknown): AsyncIterable<T> {
		if (IterCore.isNotAsyncIterable(value)) {
			throw IterCore.buildAsyncIterableErr(value);
		}
		return value;
	}

	/**
	 * Type guard that checks if a value is not an async iterable object.
	 * @template T - The type of elements contained in the async iterable.
	 * @param {unknown} value - The value to check for non-async iterability.
	 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
	 * @since v1.0.0
	 */
	public static isNotAsyncIterable<T>(value: unknown): value is Exclude<unknown, AsyncIterable<T>> {
		return !IterCore.isAsyncIterable(value);
	}

	/**
	 * Builds an type error `Invalid Iterable: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v1.0.0
	 */
	public static buildIterableErr(value: unknown): TypeError {
		return new TypeError(`Invalid Iterable: ${JSON.stringify(value)}`);
	}

	/**
	 * Builds an type error `Invalid AsyncIterable: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v1.0.0
	 */
	public static buildAsyncIterableErr(value: unknown): TypeError {
		return new TypeError(`Invalid AsyncIterable: ${JSON.stringify(value)}`);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/* c8 ignore next 999 */

/**
 * Type guard that checks if a value is an iterable object.
 * @deprecated Use {@link IterCore.isIterable} instead
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
 * @deprecated Use {@link IterCore.isNotIterable} instead
 * @template T - The type of elements contained in the iterable.
 * @param {unknown} value - The value to check for non-iterability.
 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
 * @since v0.4.5
 */
export function isNotIterable<T>(value: unknown): value is Exclude<unknown, Iterable<T>> {
	return IterCore.isNotIterable(value);
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
	return IterCore.isAsyncIterable(value);
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
	return IterCore.isNotAsyncIterable(value);
}
