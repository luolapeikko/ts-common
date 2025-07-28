import {UnknownError} from './UnknownError.mjs';

/**
 * Error core functions
 * @since v1.0.0
 */
export class ErrorCore {
	/**
	 * Get or create an error from the given value, if it's not an error, it will be wrapped in an UnknownError.
	 * @param {unknown} err - Error instance or error message.
	 * @returns {Error | UnknownError} Error instance.
	 * @see {@link UnknownError}
	 * @since v1.0.0
	 * @example
	 * try {
	 *   // ...
	 * } catch (err) {
	 *   console.log(ErrCore.from(err).message);
	 * }
	 */
	public static from(err: unknown): Error | UnknownError {
		if (err instanceof Error) {
			return err;
		} else if (typeof err === 'string') {
			return new Error(err);
		} else {
			return new UnknownError(err);
		}
	}

	/**
	 * Asserts that the given value is an Error.
	 * @param {unknown} err - Error to assert.
	 * @throws {TypeError} If the given value is not an instance of the `Error` class.
	 * @see {@link toError}
	 * @since v1.0.0
	 * @example
	 * try {
	 *   // ...
	 * } catch (err) {
	 *   ErrCore.assert(err);
	 *   console.log(err.message);
	 * }
	 */
	public static assert(err: unknown): asserts err is Error {
		if (!(err instanceof Error)) {
			throw this.from(err);
		}
	}

	/**
	 * Checks if the given value is an instance of the `Error` class.
	 * @param {unknown} err - Value to check.
	 * @returns {boolean} True if the value is an instance of the `Error` class; otherwise, false.
	 * @since v1.0.0
	 */
	public static is(err: unknown): err is Error {
		return err instanceof Error;
	}

	/**
	 * Wraps an error in a custom error type.
	 * @param {unknown} err - The error to wrap.
	 * @param {new (message?: string) => ET} ErrorClass - The constructor of the error class to use.
	 * @returns {ET} An instance of the custom error type with the original message and stack trace.
	 * @template ET - The custom error type that extends Error.
	 * @example
	 * try {
	 *   // ...
	 * } catch (err) {
	 *   throw ErrorCore.as(err, TypeError); // throws TypeError
	 * }
	 * @since v1.0.0
	 */
	public static as<ET extends Error>(err: unknown, ErrorClass: new (message?: string) => ET): ET {
		const source = ErrorCore.from(err);
		return ErrorCore.cloneProperties(source, new ErrorClass(source.message));
	}

	/**
	 * Wraps an error in a custom error type using a callback function.
	 * @param {unknown} err - The original error or error message to wrap.
	 * @param {(message?: string) => ET} callback - A function that takes an optional message and returns an instance of the custom error type.
	 * @returns {ET} An instance of the custom error type with the original message and stack trace.
	 * @template ET - The custom error type that extends Error.
	 * @example
	 * try {
	 *   // ...
	 * } catch (err) {
	 *   const customError = ErrorCore.with(err, (msg) => new CustomError(msg));
	 *   throw customError;
	 * }
	 * @since v1.0.0
	 */
	public static with<ET extends Error>(err: unknown, callback: (message?: string) => ET): ET {
		const source = ErrorCore.from(err);
		return ErrorCore.cloneProperties(source, callback(source.message));
	}

	private static cloneProperties<ET extends Error>(source: Error, target: ET): ET {
		// copy cause if supported
		if ('cause' in source) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			(target as any).cause = source.cause;
		}
		// Copy stack if needed
		if (source.stack) {
			target.stack = source.stack;
		}
		// Optionally copy other properties
		Object.assign(target, source);
		return target;
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/* c8 ignore next 999 */

/**
 * Get or create an error from the given value, if it's not an error, it will be wrapped in an UnknownError.
 * @deprecated Use {@link ErrorCore.from} instead
 * @param {unknown} err - Error instance or error message.
 * @returns {Error | UnknownError} Error instance.
 * @see {@link UnknownError}
 * @since v0.1.0
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   console.log(toError(err).message);
 * }
 */
export function toError(err: unknown): Error | UnknownError {
	return ErrorCore.from(err);
}

/**
 * Asserts that the given value is an Error.
 * @deprecated Use {@link ErrorCore.assert} instead
 * @param {unknown} err - Error to assert.
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
export function assertError(err: unknown): asserts err is Error {
	ErrorCore.assert(err);
}

/**
 * Wraps an error in a custom error type.
 * @deprecated Use {@link ErrCore.as} instead
 * @param {unknown} err - The error to wrap.
 * @param {new (message?: string) => ET} ErrorClass - The constructor of the error class to use.
 * @returns {ET} An instance of the custom error type with the original message and stack trace.
 * @template ET - The custom error type that extends Error.
 * @example
 * try {
 *   // ...
 * } catch (err) {
 *   throw errorAs(err, TypeError); // throws TypeError
 * }
 * @since v0.3.0
 */
export function errorAs<ET extends Error>(err: unknown, ErrorClass: new (message?: string) => ET): ET {
	return ErrorCore.as(err, ErrorClass);
}

/**
 * Wraps an error in a custom error type using a callback function.
 * @deprecated Use {@link ErrCore.with} instead
 * @param {unknown} err - The original error or error message to wrap.
 * @param {(message?: string) => ET} callback - A function that takes an optional message and returns an instance of the custom error type.
 * @returns {ET} An instance of the custom error type with the original message and stack trace.
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
export function errorWith<ET extends Error>(err: unknown, callback: (message?: string) => ET): ET {
	return ErrorCore.with(err, callback);
}
