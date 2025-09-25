import {type Nullish} from '../types/Nullish.mjs';
import {errorMessageBuilder, valueErrorBuilder} from './errorUtils.mjs';

/**
 * The core Number functions.
 * @since v1.0.0
 */
export class NumberCore {
	private static readonly floatOnlyRegex = /^-?\d+\.\d+(?:[eE][-+]?\d+)?$/;

	/**
	 * Get or create an number from the given value. (can be float or int)
	 * @throws {TypeError} If the given value cannot be converted to an number.
	 * @param {unknown} value - The value to convert.
	 * @returns {number} The number value.
	 * @since v1.0.4
	 * @example
	 * const value = NumberCore.numberFrom('123');
	 * const value = NumberCore.numberFrom(123);
	 * function add(a: number, b: number): number {
	 *   return NumberCore.numberFrom(a) + NumberCore.numberFrom(b);
	 * }
	 */
	public static numberFrom(value: Nullish<string | number | bigint>): number {
		return NumberCore.handleNumberFrom(value);
	}

	/**
	 * Type guard check if the given value is an integer or float value. (not NaN)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} True if the value is a number; otherwise, false.
	 * @since v1.0.4
	 * @example
	 * if (NumberCore.isNumber(value)) {
	 *   // value is a number
	 * }
	 */
	public static isNumber(value: unknown): value is number {
		return typeof value === 'number' && !Number.isNaN(value);
	}

	/**
	 * Asserts that the given value is an integer or float value.
	 * @example
	 * function add(a: number, b: number): number {
	 *   NumberCore.assertNumber(a);
	 *   NumberCore.assertNumber(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is not a number.
	 * @param {unknown} value - The value to assert.
	 * @since v1.0.4
	 */
	public static assertNumber(value: unknown): asserts value is number {
		if (!NumberCore.isNumber(value)) {
			throw NumberCore.buildValueErr(value, 'Number');
		}
	}

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
	public static floatFrom(value: Nullish<string | number | bigint>): number {
		return NumberCore.handleFloatFrom(value);
	}

	/**
	 * Type guard check if the given value is an float.
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
			throw NumberCore.buildValueErr(value, 'Float');
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
	public static intFrom(value: Nullish<string | number | bigint>): number {
		return NumberCore.handleIntFrom(value);
	}

	/**
	 * Type guard check if the given value is an integer.
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
			throw NumberCore.buildValueErr(value, 'Integer');
		}
	}

	/**
	 * Get or create a bigint from the given value. (Note: on float conversion, Math.trunc() is used)
	 * @throws {TypeError} If the given value cannot be converted to a bigint.
	 * @param {unknown} value - The value to convert.
	 * @returns {bigint} The bigint value.
	 * @since v1.0.4
	 */
	public static bigIntFrom(value: Nullish<string | number | bigint>): bigint {
		return NumberCore.handleBigIntFrom(value);
	}

	/**
	 * Checks if the given value is a bigint.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} True if the value is a bigint; otherwise, false.
	 * @since v1.0.4
	 */
	public static isBigInt(value: unknown): value is bigint {
		return typeof value === 'bigint';
	}

	/**
	 * Asserts that the given value is a bigint.
	 * @example
	 * function add(a: bigint, b: bigint): bigint {
	 *   NumberCore.assertBigInt(a);
	 *   NumberCore.assertBigInt(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is not a bigint.
	 * @param {unknown} value - The value to assert.
	 * @since v1.0.4
	 */
	public static assertBigInt(value: unknown): asserts value is bigint {
		if (!NumberCore.isBigInt(value)) {
			throw NumberCore.buildValueErr(value, 'BigInt');
		}
	}

	private static handleNumberFrom(value: unknown, args?: {orgValue: unknown; buildErr: (value: unknown) => TypeError}): number {
		if (NumberCore.isFloat(value)) {
			return value;
		}
		if (NumberCore.isInt(value)) {
			return value;
		}
		if (typeof value === 'string') {
			return NumberCore.isFloatStringLike(value)
				? NumberCore.handleFloatFrom(parseFloat(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Number')})
				: NumberCore.handleIntFrom(parseFloat(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Number')});
		}
		if (NumberCore.isBigInt(value)) {
			NumberCore.assertBigIntSafeNumber(value, NumberCore.buildCustomError(`${value} exceeds safe number range.`, 'Number'));
			return NumberCore.handleIntFrom(Number(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Number')});
		}
		throw args ? args.buildErr(args.orgValue) : NumberCore.buildValueErr(value, 'Number');
	}

	private static handleFloatFrom(value: unknown, args?: {orgValue: unknown; buildErr: (value: unknown) => TypeError}): number {
		if (NumberCore.isFloat(value)) {
			return value;
		}
		if (NumberCore.isInt(value)) {
			return value + 0.0; // force int to float
		}
		if (typeof value === 'string') {
			return NumberCore.handleFloatFrom(parseFloat(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Float')});
		}
		if (NumberCore.isBigInt(value)) {
			NumberCore.assertBigIntSafeNumber(value, NumberCore.buildCustomError(`${value} exceeds safe float range.`, 'Float'));
			return NumberCore.handleFloatFrom(Number(value));
		}
		throw args ? args.buildErr(args.orgValue) : NumberCore.buildValueErr(value, 'Float');
	}

	private static handleIntFrom(value: unknown, args?: {orgValue: unknown; buildErr: (value: unknown) => TypeError}): number {
		if (NumberCore.isInt(value)) {
			return value;
		}
		if (NumberCore.isFloat(value)) {
			return Math.trunc(value);
		}
		if (typeof value === 'string') {
			return NumberCore.handleIntFrom(parseInt(value), {orgValue: value, buildErr: (value) => NumberCore.buildValueErr(value, 'Integer')});
		}
		if (NumberCore.isBigInt(value)) {
			NumberCore.assertBigIntSafeNumber(value, NumberCore.buildCustomError(`${value} exceeds safe integer range.`, 'Integer'));
			return Number(value);
		}
		throw args ? args.buildErr(args.orgValue) : NumberCore.buildValueErr(value, 'Integer');
	}

	private static assertBigIntSafeNumber(value: bigint, errorMessage: string): asserts value is bigint {
		if (!(value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER))) {
			throw new RangeError(errorMessage);
		}
	}

	private static handleBigIntFrom(value: unknown, orgValue?: string): bigint {
		if (NumberCore.isBigInt(value)) {
			return value;
		}
		if (NumberCore.isInt(value)) {
			return NumberCore.castBigInt(value);
		}
		if (NumberCore.isFloat(value)) {
			return NumberCore.castBigInt(Math.trunc(value));
		}
		if (typeof value === 'string') {
			return NumberCore.castBigInt(value);
		}
		throw NumberCore.buildValueErr(orgValue ?? value, 'BigInt');
	}

	private static castBigInt(value: string | number): bigint {
		try {
			// BigInt can't handle string float values, so we need to check if the value is a float string-like and pre-handle it accordingly
			return NumberCore.isFloatStringLike(value) ? NumberCore.handleBigIntFrom(NumberCore.floatFrom(value), value) : BigInt(Number(value));
			// eslint-disable-next-line sonarjs/no-ignored-exceptions
		} catch (_error) {
			// BigInt throws SyntaxError on invalid string, override it with TypeError
			throw NumberCore.buildValueErr(value, 'BigInt');
		}
	}

	private static isFloatStringLike(value: unknown): value is string {
		return typeof value === 'string' && NumberCore.floatOnlyRegex.test(value.trim());
	}

	/**
	 * Builds value error.
	 * @param {unknown} value - The invalid value.
	 * @param {'Number' | 'Integer' | 'Float' | 'BigInt'} typeName - The expected type name.
	 * @param {boolean} [isNot] - Whether the error should be for `!${typeName}`.
	 * @returns {TypeError} The created error.
	 * @since v1.1.2
	 */
	public static buildValueErr(value: unknown, typeName: 'Number' | 'Integer' | 'Float' | 'BigInt', isNot = false): TypeError {
		return valueErrorBuilder(value, typeName, isNot);
	}

	public static buildCustomError(message: string, typeName: 'Number' | 'Integer' | 'Float' | 'BigInt'): string {
		return errorMessageBuilder(typeName, message);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
