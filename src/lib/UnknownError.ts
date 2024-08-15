/**
 * Unknown error class, used to wrap unknown thrown errors.
 * @extends TypeError
 * @see [toError](https://luolapeikko.github.io/ts-common/functions/toError.html)
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
	 * @param unknownError - The unknown error value to wrap.
	 */
	constructor(unknownError: unknown) {
		super(`Unknown error: ${JSON.stringify(unknownError)}`);
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
	}
}
