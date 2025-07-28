import {type Nullish} from '../types/Nullish.mjs';

/**
 * The core Number functions.
 * @since v1.0.0
 */
export class NumberCore {
	/**
	 * Get or create an float from the given value.
	 * @throws {TypeError} If the given value cannot be converted to an float.
	 * @param {unknown} value - The value to convert.
	 * @returns {number} The float value.
	 * @since v1.0.0
	 * @example
	 * const value = NumberCore.floatFrom('123.5');
	 * const value = NumberCore.floatFrom(123.5);
	 * function add(a: number, b: number): number {
	 *   return NumberCore.floatFrom(a) + NumberCore.floatFrom(b);
	 * }
	 */
	public static floatFrom(value: Nullish<string | number>): number {
		return NumberCore.handleFloatFrom(value);
	}

	/**
	 * Checks if the given value is an float.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} True if the value is an float; otherwise, false.
	 * @since v1.0.0
	 */
	public static isFloat(value: unknown): value is number {
		return Number.isFinite(value) && !Number.isInteger(value);
	}

	/**
	 * Asserts that the given value is an float.
	 * @example
	 * function add(a: number, b: number): number {
	 *   NumberCore.assertFloat(a);
	 *   NumberCore.assertFloat(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is not an float.
	 * @param {unknown} value - The value to assert.
	 * @since v1.0.0
	 */
	public static assertFloat(value: unknown): asserts value is number {
		if (!NumberCore.isFloat(value)) {
			throw NumberCore.buildFloatErr(value);
		}
	}

	/**
	 * Get or create an integer from the given value. (Note: on float conversion, Math.trunc() is used)
	 * @throws {TypeError} If the given value cannot be converted to an integer.
	 * @param {unknown} value - The value to convert.
	 * @returns {number} The integer value.
	 * @since v1.0.0
	 * @example
	 * const value = NumberCore.intFrom('123');
	 * const value = NumberCore.intFrom(123);
	 * function add(a: number, b: number): number {
	 *   return IntCore.intFrom(a) + IntCore.intFrom(b);
	 * }
	 */
	public static intFrom(value: Nullish<string | number>): number {
		return NumberCore.handleIntFrom(value);
	}

	/**
	 * Checks if the given value is an integer.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} True if the value is an integer; otherwise, false.
	 * @since v1.0.0
	 */
	public static isInt(value: unknown): value is number {
		return Number.isInteger(value);
	}

	/**
	 * Asserts that the given value is an integer.
	 * @example
	 * function add(a: number, b: number): number {
	 *   NumberCore.assertInt(a);
	 *   NumberCore.assertInt(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is not an integer.
	 * @param {unknown} value - The value to assert.
	 * @since v1.0.0
	 */
	public static assertInt(value: unknown): asserts value is number {
		if (!NumberCore.isInt(value)) {
			throw NumberCore.buildIntErr(value);
		}
	}

	/**
	 * Builds an type error `Invalid float: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v1.0.0
	 */
	public static buildFloatErr(value: unknown): TypeError {
		return new TypeError(`Invalid float: ${JSON.stringify(value)}`);
	}

	/**
	 * Builds an type error `Invalid integer: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v1.0.0
	 */
	public static buildIntErr(value: unknown): TypeError {
		return new TypeError(`Invalid integer: ${JSON.stringify(value)}`);
	}

	private static handleFloatFrom(value: unknown, orgValue?: string): number {
		if (NumberCore.isFloat(value)) {
			return value;
		}
		if (NumberCore.isInt(value)) {
			return value + 0.0; // force int to float
		}
		if (typeof value === 'string') {
			return NumberCore.handleFloatFrom(parseFloat(value), value);
		}
		throw NumberCore.buildFloatErr(orgValue ?? value);
	}

	private static handleIntFrom(value: unknown, orgValue?: string): number {
		if (NumberCore.isInt(value)) {
			return value;
		}
		if (NumberCore.isFloat(value)) {
			return Math.trunc(value);
		}
		if (typeof value === 'string') {
			return NumberCore.handleIntFrom(parseInt(value), value);
		}
		throw NumberCore.buildIntErr(orgValue ?? value);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
