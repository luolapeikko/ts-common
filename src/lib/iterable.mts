/**
 * Type guard that checks if a value is an iterable object.
 * @template T - The type of elements contained in the iterable.
 * @param {unknown} value - The value to check for iterability.
 * @returns {boolean} `true` if the value implements the `Iterable` interface; otherwise, `false`.
 * @since v0.4.4
 */
export function isIterable<T>(value: unknown): value is Iterable<T> {
	return value != null && typeof (value as Iterable<T>)[Symbol.iterator] === 'function';
}

/**
 * Type guard that checks if a value is not an iterable object.
 * @template T - The type of elements contained in the iterable.
 * @param {unknown} value - The value to check for non-iterability.
 * @returns {boolean} `true` if the value does not implement the `Iterable` interface; otherwise, `false`.
 * @since v0.4.4
 */
export function isNotIterable<T>(value: unknown): value is Exclude<unknown, Iterable<T>> {
	return !isIterable(value);
}

/**
 * Type guard that checks if a value is an async iterable object.
 * @template T - The type of elements contained in the async iterable.
 * @param {unknown} value - The value to check for async iterability.
 * @returns {boolean} `true` if the value implements the `AsyncIterable` interface; otherwise, `false`.
 * @since v0.4.4
 */
export function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
	return value != null && typeof (value as AsyncIterable<T>)[Symbol.asyncIterator] === 'function';
}

/**
 * Type guard that checks if a value is not an async iterable object.
 * @template T - The type of elements contained in the async iterable.
 * @param {unknown} value - The value to check for non-async iterability.
 * @returns {boolean} `true` if the value does not implement the `AsyncIterable` interface; otherwise, `false`.
 * @since v0.4.4
 */
export function isNotAsyncIterable<T>(value: unknown): value is Exclude<unknown, AsyncIterable<T>> {
	return !isAsyncIterable(value);
}
