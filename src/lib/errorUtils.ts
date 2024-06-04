/**
 * Get or create an error from the given value.
 * @param error - Error instance or error message.
 * @returns Error instance.
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   console.log(toError(err).message);
 * }
 */
export function toError(error: unknown): Error {
	if (error instanceof Error) {
		return error;
	}
	if (typeof error === 'string') {
		return new Error(error);
	}
	return new TypeError(`Unknown error: ${JSON.stringify(error)}`);
}

/**
 * Asserts that the given value is an Error.
 * @param error - Error to assert.
 * @throws If the given value is not an Error.
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
