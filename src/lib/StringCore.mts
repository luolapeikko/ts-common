import {type EmptyString, type NonEmptyString, type NumberString, type PrefixedString, type SuffixedString} from '../types/String.mjs';

/**
 * The `StringCore` class provides utility functions for string type checks and assertions.
 * @since v1.0.2
 */
export class StringCore {
	/**
	 * Type guard to check if a value is a `string`.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a `string`; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static is(value: unknown): value is string {
		return typeof value === 'string';
	}

	/**
	 * Type guard to check if a value is not a `string`.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is not a `string`; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isNot<T>(value: T): value is Exclude<T, string> {
		return !StringCore.is(value);
	}

	/**
	 * Type guard to check if a value is an `EmptyString`.
	 * @example
	 * StringCore.isEmpty(''); // true
	 * StringCore.isEmpty('hello'); // false
	 * StringCore.isEmpty(123); // false (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is an empty string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isEmpty(value: unknown): value is EmptyString {
		return StringCore.is(value) && value.length === 0;
	}

	/**
	 * Type guard to check if a value is a `NonEmptyString<T>`.
	 * @example
	 * StringCore.isNotEmpty('hello'); // true
	 * StringCore.isNotEmpty(''); // false
	 * StringCore.isNotEmpty(123); // false (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a not empty string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isNotEmpty<T>(value: T): value is NonEmptyString<T> {
		return StringCore.is(value) && value.length > 0;
	}

	/**
	 * Type guard to check if a value is a `Lowercase<string>`.
	 * @example
	 * StringCore.isLowerCase('hello'); // true
	 * StringCore.isLowerCase('HELLO'); // false
	 * StringCore.isLowerCase(123); // false (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a lowercase string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isLowerCase(value: unknown): value is Lowercase<string> {
		return StringCore.is(value) && value === value.toLowerCase();
	}

	/**
	 * Type guard to check if a value is an `Uppercase<string>`.
	 * @example
	 * StringCore.isUpperCase('HELLO'); // true
	 * StringCore.isUpperCase('hello'); // false
	 * StringCore.isUpperCase(123); // false (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is an uppercase string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isUpperCase(value: unknown): value is Uppercase<string> {
		return StringCore.is(value) && value === value.toUpperCase();
	}

	/**
	 * Type guard to check if a value starts with the specified prefix.
	 * @example
	 * StringCore.startsWith('hello', 'he'); // true
	 * StringCore.startsWith('hello', 'el'); // false
	 * StringCore.startsWith(123, 'he'); // false (not a string)
	 * @template P - The prefix to check.
	 * @param {unknown} value - The value to check.
	 * @param {P} prefix - The expected prefix.
	 * @returns {value is PrefixedString<P>} `true` if the value starts with the prefix; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static startsWith<P extends string>(value: unknown, prefix: P): value is PrefixedString<P> {
		return StringCore.is(value) && value.startsWith(prefix);
	}

	/**
	 * Type guard to check if a value ends with the specified suffix.
	 * @example
	 * StringCore.endsWith('hello', 'lo'); // true
	 * StringCore.endsWith('hello', 'he'); // false
	 * StringCore.endsWith(123, 'lo'); // false (not a string)
	 * @template S - The suffix to check.
	 * @param {unknown} value - The value to check.
	 * @param {S} suffix - The expected suffix.
	 * @returns {value is SuffixedString<S>} `true` if the value ends with the suffix; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static endsWith<S extends string>(value: unknown, suffix: S): value is SuffixedString<S> {
		return StringCore.is(value) && value.endsWith(suffix);
	}

	/**
	 * Type guard to check if a value is a `NumberString`.
	 * @example
	 * StringCore.isNumeric('123'); // true
	 * StringCore.isNumeric('12.3'); // true
	 * StringCore.isNumeric('abc'); // false
	 * StringCore.isNumeric(123); // false (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a numeric string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isNumeric(value: unknown): value is NumberString {
		return StringCore.is(value) && !isNaN(Number(value)) && !isNaN(parseFloat(value));
	}

	/**
	 * Type guard to check if a value is not a `NumberString`.
	 * @example
	 * StringCore.isNotNumeric('abc'); // true
	 * StringCore.isNotNumeric('123'); // false
	 * StringCore.isNotNumeric(123); // true (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is not a numeric string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isNotNumeric<T>(value: T): value is Exclude<T, NumberString> {
		return !StringCore.isNumeric(value);
	}

	/**
	 * Asserts that a given value is a `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is not a string.
	 * @since v1.0.2
	 */
	public static assert(value: unknown): asserts value is string {
		if (!StringCore.is(value)) {
			throw StringCore.buildErr(value);
		}
	}

	/**
	 * Asserts that a given value is *not* a `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is a string.
	 * @since v1.0.2
	 */
	public static assertNot<T>(value: unknown): asserts value is Exclude<T, string> {
		if (StringCore.is(value)) {
			throw StringCore.buildErr(value);
		}
	}

	/**
	 * Builds an type error `Invalid string: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v1.0.2
	 */
	public static buildErr(value: unknown): TypeError {
		switch (typeof value) {
			case 'number':
				return new TypeError(`Invalid string: ${value} [Number]`);
			case 'boolean':
				return new TypeError(`Invalid string: ${value} [Boolean]`);
			case 'bigint':
				return new TypeError(`Invalid string: ${value} [BigInt]`);
			case 'function':
				return new TypeError(`Invalid string: [Function]`);
			case 'symbol':
				return new TypeError(`Invalid string: [Symbol]`);
			default:
				return new TypeError(`Invalid string: ${JSON.stringify(value)}`);
		}
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
