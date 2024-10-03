import {UnknownError} from './UnknownError.js';

/**
 * Get or create an error from the given value, if it's not an error, it will be wrapped in an UnknownError.
 * @param error - Error instance or error message.
 * @returns Error instance.
 * @see {@link UnknownError}
 * @version 0.1.0
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
 * @throws If the given value is not an Error.
 * @see {@link toError}
 * @version 0.1.0
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
