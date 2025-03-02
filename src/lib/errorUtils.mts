import {UnknownError} from './UnknownError.mjs';

/**
 * Get or create an error from the given value, if it's not an error, it will be wrapped in an UnknownError.
 * @param error - Error instance or error message.
 * @returns Error instance.
 * @see {@link UnknownError}
 * @since v0.1.0
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   console.log(toError(err).message);
 * }
 */
export function toError(error: unknown): Error | UnknownError {
	if (error instanceof Error) {
		return error;
	}
	if (typeof error === 'string') {
		return new Error(error);
	}
	return new UnknownError(error);
}

/**
 * Asserts that the given value is an Error.
 * @param error - Error to assert.
 * @throws {TypeError} If the given value is not an instance of the `Error` class.
 * @see {@link toError}
 * @since v0.1.0
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   assertError(err);
 *   console.log(err.message);
 * }
 */
export function assertError(error: unknown): asserts error is Error {
	if (!(error instanceof Error)) {
		throw toError(error);
	}
}

function cloneErrorProperties<ET extends Error>(source: Error, target: ET): ET {
	// copy cause if supported
	if ('cause' in source) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		(target as any).cause = source.cause;
	}
	// copy stack
	target.stack = source.stack;
	return target;
}

/**
 * Wraps an error in a custom error type.
 * @param error - The error to wrap.
 * @param ErrorClass - The constructor of the error class to use.
 * @returns An instance of the custom error type with the original message and stack trace.
 * @template ET - The custom error type that extends Error.
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   throw errorAs(err, TypeError); // throws TypeError
 * }
 * @since v0.3.0
 */
export function errorAs<ET extends Error>(error: unknown, ErrorClass: new (message?: string) => ET): ET {
	const baseError = toError(error);
	return cloneErrorProperties(baseError, new ErrorClass(baseError.message));
}

/**
 * Wraps an error in a custom error type using a callback function.
 * @param error - The original error or error message to wrap.
 * @param callback - A function that takes an optional message and returns an instance of the custom error type.
 * @returns An instance of the custom error type with the original message and stack trace.
 * @template ET - The custom error type that extends Error.
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   const customError = errorWith(err, (msg) => new CustomError(msg));
 *   throw customError;
 * }
 * @since v0.3.0
 */

export function errorWith<ET extends Error>(error: unknown, callback: (message?: string) => ET): ET {
	const baseError = toError(error);
	return cloneErrorProperties(baseError, callback(baseError.message));
}
