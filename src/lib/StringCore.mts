import type {WithAssertCore, WithFromCore, WithIsCore} from '../types/core.mjs';
import type {Nullish} from '../types/Nullish.mjs';
import type {EmptyString, NotStringType, NumberString, PrefixedString, StringFnMapping, SuffixedString} from '../types/String.mjs';
import {errorBuilder} from './errorUtils.mjs';

/**
 * The `StringCore` class provides utility functions for string type checks and assertions.
 * @since v1.0.2
 */
export class StringCore {
	/**
	 * Asserts that a given value is a `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is not a string.
	 * @since v1.0.2
	 */
	public static assert(value: unknown): asserts value is string;
	public static assert<T>(value: T): asserts value is Extract<T, string>;
	public static assert<T>(value: T): asserts value is Extract<T, string> {
		if (!StringCore.is(value)) {
			throw StringCore.buildErr(value, 'String');
		}
	}

	/**
	 * Asserts that a given value is *not* a `string`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is a string.
	 * @since v1.0.2
	 */
	public static assertNot<T>(value: T): asserts value is Exclude<T, string> {
		if (StringCore.is(value)) {
			throw StringCore.buildErr(value, 'NonString');
		}
	}

	/**
	 * Asserts that a value is an `EmptyString`.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is not an empty string.
	 * @since v1.0.2
	 */
	public static assertEmpty(value: unknown): asserts value is EmptyString;
	public static assertEmpty<T>(value: T): asserts value is Extract<T, EmptyString>;
	public static assertEmpty<T>(value: T): asserts value is Extract<T, EmptyString> {
		if (!StringCore.isEmpty(value)) {
			throw StringCore.buildErr(value, 'EmptyString');
		}
	}

	/**
	 * Asserts that a value is a `NonEmptyString<T>`.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is not a non-empty string.
	 * @since v1.0.2
	 */
	public static assertNotEmpty<T>(value: T): asserts value is NotStringType<T, EmptyString> {
		if (!StringCore.isNotEmpty(value)) {
			throw StringCore.buildErr(value, 'NonEmptyString');
		}
	}

	/**
	 * Asserts that a value is a `Lowercase<string>`.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is not a lowercase string.
	 * @since v1.0.2
	 */
	public static assertLowerCase(value: unknown): asserts value is Lowercase<string>;
	public static assertLowerCase<T>(value: T): asserts value is Extract<T, Lowercase<string>>;
	public static assertLowerCase<T>(value: T): asserts value is Extract<T, Lowercase<string>> {
		if (!StringCore.isLowerCase(value)) {
			throw StringCore.buildErr(value, 'LowerCaseString');
		}
	}

	/**
	 * Asserts that a value is not a `Lowercase<string>`.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is a lowercase string.
	 * @since v1.0.2
	 */
	public static assertNotLowerCase<T>(value: T): asserts value is NotStringType<T, Lowercase<string>> {
		if (StringCore.isLowerCase(value)) {
			throw StringCore.buildErr(value, 'NonLowerCaseString');
		}
	}

	/**
	 * Asserts that a value is an `Uppercase<string>`.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is not an uppercase string.
	 * @since v1.0.2
	 */
	public static assertUpperCase(value: unknown): asserts value is Uppercase<string>;
	public static assertUpperCase<T>(value: T): asserts value is Extract<T, Uppercase<string>>;
	public static assertUpperCase<T>(value: T): asserts value is Extract<T, Uppercase<string>> {
		if (!StringCore.isUpperCase(value)) {
			throw StringCore.buildErr(value, 'UpperCaseString');
		}
	}

	/**
	 * Asserts that a value is not an `Uppercase<string>`.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is an uppercase string.
	 * @since v1.0.2
	 */
	public static assertNotUpperCase<T>(value: T): asserts value is NotStringType<T, Uppercase<string>> {
		if (StringCore.isUpperCase(value)) {
			throw StringCore.buildErr(value, 'NonUpperCaseString');
		}
	}

	/**
	 * Asserts that a value is a `NumberString`.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is not a numeric string.
	 * @since v1.0.2
	 */
	public static assertNumeric(value: unknown): asserts value is NumberString;
	public static assertNumeric<T>(value: T): asserts value is Extract<T, NumberString>;
	public static assertNumeric<T>(value: T): asserts value is Extract<T, NumberString> {
		if (!StringCore.isNumeric(value)) {
			throw StringCore.buildErr(value, 'NumberString');
		}
	}

	/**
	 * Asserts that a given value is not a `NumberString`.
	 * @param {unknown} value - Value to check.
	 * @throws {TypeError} If the value is a numeric string.
	 * @since v1.0.2
	 */
	public static assertNotNumeric<T>(value: T): asserts value is NotStringType<T, NumberString> {
		if (StringCore.isNumeric(value)) {
			throw StringCore.buildErr(value, 'NonNumberString');
		}
	}

	/**
	 * Gets a valid `string` from a `string | null | undefined`, throws if the value is not a valid string.
	 * @param {Nullish<string>} value - The value to convert.
	 * @returns {string} The valid string.
	 * @since v1.0.2
	 */
	public static from(value: Nullish<string>): string {
		StringCore.assert(value);
		return value;
	}

	/**
	 * Gets a valid `EmptyString` from a `string | null | undefined`, throws if the value is not an empty string.
	 * @param {Nullish<string>} value - The value to convert.
	 * @returns {EmptyString} The valid empty string.
	 * @since v1.0.2
	 */
	public static emptyFrom(value: Nullish<string>): EmptyString {
		StringCore.assertEmpty(value);
		return value;
	}

	/**
	 * Gets a valid `Lowercase<string>` from a `string | null | undefined`, throws if the value is not a non-empty string.
	 * @param {Nullish<string>} value - The value to convert.
	 * @returns {Lowercase<string>} The valid lowercase string.
	 * @since v1.0.2
	 */
	public static lowerCaseFrom(value: Nullish<string>): Lowercase<string> {
		StringCore.assertLowerCase(value);
		return value;
	}

	/**
	 * Gets a valid `Uppercase<string>` from a `string | null | undefined`, throws if the value is not an uppercase string.
	 * @param {Nullish<string>} value - The value to convert.
	 * @returns {Uppercase<string>} The valid uppercase string.
	 * @since v1.0.2
	 */
	public static upperCaseFrom(value: Nullish<string>): Uppercase<string> {
		StringCore.assertUpperCase(value);
		return value;
	}

	/**
	 * Gets a valid `NumberString` from a `string | null | undefined`, throws if the value is not a numeric string.
	 * @param {Nullish<string>} value - The value to convert.
	 * @returns {NumberString} The valid numeric string.
	 * @since v1.0.2
	 */
	public static numericFrom(value: Nullish<string>): NumberString {
		StringCore.assertNumeric(value);
		return value;
	}

	/**
	 * Type guard to check if a value is a `string`.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is a `string`; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static is(value: unknown): value is string;
	public static is<T>(value: T): value is Extract<T, string>;
	public static is<T>(value: T): value is Extract<T, string> {
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
	public static isEmpty(value: unknown): value is EmptyString;
	public static isEmpty<T>(value: T): value is Extract<T, EmptyString>;
	public static isEmpty<T>(value: T): value is Extract<T, EmptyString> {
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
	public static isNotEmpty<T>(value: T): value is NotStringType<T, EmptyString> {
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
	public static isLowerCase(value: unknown): value is Lowercase<string>;
	public static isLowerCase<T>(value: T): value is Extract<T, Lowercase<string>>;
	public static isLowerCase<T>(value: T): value is Extract<T, Lowercase<string>> {
		return StringCore.is(value) && StringCore.isNotEmpty(value) && value === value.toLowerCase();
	}

	/**
	 * Type guard to check if a value is not a `Lowercase<string>`.
	 * @example
	 * StringCore.isNotLowerCase('HELLO'); // true
	 * StringCore.isNotLowerCase('hello'); // false
	 * StringCore.isNotLowerCase(123); // true (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is not a lowercase string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isNotLowerCase<T>(value: T): value is NotStringType<T, Lowercase<string>> {
		return !StringCore.isLowerCase(value);
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
	public static isUpperCase(value: unknown): value is Uppercase<string>;
	public static isUpperCase<T>(value: T): value is Extract<T, Uppercase<string>>;
	public static isUpperCase<T>(value: T): value is Extract<T, Uppercase<string>> {
		return StringCore.is(value) && StringCore.isNotEmpty(value) && value === value.toUpperCase();
	}

	/**
	 * Type guard to check if a value is not an `Uppercase<string>`.
	 * @example
	 * StringCore.isNotUpperCase('hello'); // true
	 * StringCore.isNotUpperCase('HELLO'); // false
	 * StringCore.isNotUpperCase(123); // true (not a string)
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} `true` if the value is not an uppercase string; otherwise, `false`.
	 * @since v1.0.2
	 */
	public static isNotUpperCase<T>(value: T): value is NotStringType<T, Uppercase<string>> {
		return !StringCore.isUpperCase(value);
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
	public static isNumeric(value: unknown): value is NumberString;
	public static isNumeric<T>(value: T): value is Extract<T, NumberString>;
	public static isNumeric<T>(value: T): value is Extract<T, NumberString> {
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
	public static isNotNumeric<T>(value: T): value is NotStringType<T, NumberString> {
		return !StringCore.isNumeric(value);
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
	 * Builds an type error `Invalid string: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @param {'String' | 'NonString' | 'EmptyString' | 'NonEmptyString' | 'LowerCaseString' | 'NonLowerCaseString' | 'UpperCaseString' | 'NonUpperCaseString' | 'NumberString' | 'NonNumberString'} typeName - The expected type name.
	 * @returns {TypeError} The created error.
	 * @since v1.0.2
	 */
	public static buildErr(
		value: unknown,
		typeName:
			| 'String'
			| 'NonString'
			| 'EmptyString'
			| 'NonEmptyString'
			| 'LowerCaseString'
			| 'NonLowerCaseString'
			| 'UpperCaseString'
			| 'NonUpperCaseString'
			| 'NumberString'
			| 'NonNumberString',
	): TypeError {
		return errorBuilder(value, typeName);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
type BaseType = WithIsCore<StringFnMapping> &
	WithFromCore<StringFnMapping> &
	WithAssertCore<StringFnMapping> & {
		startsWith<P extends string>(value: unknown, prefix: P): value is PrefixedString<P>;
		endsWith<S extends string>(value: unknown, suffix: S): value is SuffixedString<S>;
	};
void 0 as unknown as typeof StringCore satisfies BaseType;
