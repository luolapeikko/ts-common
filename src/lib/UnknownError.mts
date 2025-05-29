/**
 * Builds an error message from an unknown error value.
 * If the error is a string, it is wrapped in quotes.
 * If the error is an Error instance, its message property is used.
 * Otherwise, the error is JSON stringified.
 * @param {unknown} err - The unknown error value to wrap.
 * @returns {string} A string describing the error.
 */
function toMsg(err: unknown): string {
	let msg: string;
	if (typeof err === 'string') {
		msg = `"${err}"`;
	} else if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
		msg = `"${err.message}"`;
	} else {
		msg = JSON.stringify(err);
	}
	return `Unknown error: ${msg}`;
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
	 * @param {unknown} err - The unknown error value to wrap.
	 */
	constructor(err: unknown) {
		super(toMsg(err));
		this.unknownError = err;
		this.name = 'UnknownError';
		// try to copy some properties from the original object if exists
		if (typeof err === 'object' && err !== null) {
			this.stack = (err as Error).stack;
			this.name = (err as Error).name || this.name;
		}
		if (!this.stack) {
			Error.captureStackTrace(this, this.constructor);
		}
		// Set the prototype explicitly to maintain the correct prototype chain
		// @see https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses
		Object.setPrototypeOf(this, UnknownError.prototype);
	}
}
