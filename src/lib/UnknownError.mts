/**
 * Builds an error message from an unknown error value.
 * If the error is a string, it is wrapped in quotes.
 * If the error is an Error instance, its message property is used.
 * If the error is an object with a message string property, it is used.
 * Otherwise, the error is JSON stringified.
 * @param {unknown} unknownError - The unknown error value to wrap.
 * @returns {string} A string describing the error.
 */
function buildUnknownMessage(unknownError: unknown): string {
	if (typeof unknownError === 'string') {
		return `Unknown error: "${unknownError}"`;
	}
	if (unknownError instanceof Error) {
		return `Unknown error: "${unknownError.message}"`;
	}
	if (typeof unknownError === 'object' && unknownError !== null && 'message' in unknownError && typeof unknownError.message === 'string') {
		return `Unknown error: "${unknownError.message}"`;
	}
	return `Unknown error: ${JSON.stringify(unknownError)}`;
}

/**
 * Unknown error class, used to wrap unknown thrown errors.
 * @augments TypeError
 * @see [toError](https://luolapeikko.github.io/ts-common/functions/toError.html)
 * @since v0.2.0
 * @example
 * } catch (err) {
 *   console.err(( err instanceof Error ? err : new UnknownError(err)).message);
 *   // or use the toError wrap function
 *   console.err(toError(err).message);
 * }
 */
export class UnknownError extends TypeError {
	/** Original unknown error value */
	public readonly unknownError: unknown;
	/**
	 * Constructor for the UnknownError class.
	 * @param {unknown} unknownError - The unknown error value to wrap.
	 */
	constructor(unknownError: unknown) {
		super(buildUnknownMessage(unknownError));
		this.unknownError = unknownError;
		this.name = 'UnknownError';
		// try to copy some properties from the original object if exists
		if (typeof unknownError === 'object' && unknownError !== null) {
			this.stack = (unknownError as Error).stack;
			this.name = (unknownError as Error).name || this.name;
		}
		if (!this.stack) {
			Error.captureStackTrace(this, this.constructor);
		}
		// Set the prototype explicitly to maintain the correct prototype chain
		// @see https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses
		Object.setPrototypeOf(this, UnknownError.prototype);
	}
}
