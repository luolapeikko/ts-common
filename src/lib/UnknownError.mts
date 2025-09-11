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
 * Unknown error class, used to wrap unknown errors into a proper Error instance.
 * @augments TypeError
 * @see [ErrorCore.from](https://luolapeikko.github.io/ts-common/classes/ErrorCore.html#from)
 * @since v0.2.0
 * @example
 * } catch (err) {
 *   console.err(new UnknownError(err).message);
 *   // or use the ErrorCore.from function to handle all error types
 *   console.err(ErrorCore.from(err).message);
 * }
 */
export class UnknownError extends TypeError {
	/**
	 * Constructor for the UnknownError class.
	 * @param {unknown} cause - The unknown error value to wrap.
	 */
	constructor(cause: unknown) {
		super(toMsg(cause), {cause});
		this.name = 'UnknownError';
	}
}
