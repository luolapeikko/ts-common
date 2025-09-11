/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {PredIsFn, PredIsFnUnknown, PredIsNotFn, WithIsPredicates} from '../types/predicate.mjs';
import type {EmptyString, NonEmptyString, NumberString, PrefixedString, StringFnMapping, SuffixedString} from '../types/String.mjs';
import {StringCore} from './StringCore.mjs';

/**
 * The `StringPredicate` class provides predicate functions for string type checks.
 * @since v1.0.6
 */
export class StringPredicate {
	/**
	 * Checks if the given value is a `string`.
	 * @example
	 * const values = [123, "hello", true];
	 * const strings = values.filter(StringPredicate.is());
	 * console.log(strings); // ["hello"]
	 * @returns {function} A predicate function that checks if the value is a `string`.
	 * @since v1.0.6
	 */
	public static is<T extends unknown>(): PredIsFn<string, string, T> {
		return <R extends T>(value: R): value is Extract<R, string> => StringCore.is<R>(value);
	}

	/**
	 * Checks if the given value is not a `string`.
	 * @example
	 * const values = [123, "hello", true] as const;
	 * const nonStrings = values.filter(StringPredicate.isNot());
	 * console.log(nonStrings); // [123, true]
	 * @returns {function} A predicate function that checks if the value is not a `string`.
	 * @since v1.0.6
	 */
	public static isNot<T extends unknown>(): PredIsNotFn<string, string, T> {
		return <R extends T>(value: R): value is Exclude<R, string> => StringCore.isNot<R>(value);
	}

	/**
	 * Checks if the given value is an {@link EmptyString}.
	 * @example
	 * const values = ["", "hello", "world"] as const;
	 * const emptyStrings = values.filter(StringPredicate.isEmpty());
	 * console.log(emptyStrings); // [""]
	 * @returns {function} A predicate function that checks if the value is an {@link EmptyString}.
	 * @since v1.0.6
	 */
	public static isEmpty<T extends unknown>(): PredIsFn<string, EmptyString, T> {
		return <R extends T>(value: R): value is Extract<R, EmptyString> => StringCore.isEmpty<R>(value);
	}

	/**
	 * Checks if the given value is a {@link NonEmptyString}.
	 * @example
	 * const values = ["", "hello", "world"] as const;
	 * const nonEmptyStrings = values.filter(StringPredicate.isNotEmpty());
	 * console.log(nonEmptyStrings); // ["hello", "world"]
	 * @returns {function} A predicate function that checks if the value is a {@link NonEmptyString}.
	 * @since v1.0.6
	 */
	public static isNotEmpty<T extends unknown>(): PredIsNotFn<string, EmptyString, T> {
		return <R extends T>(value: R): value is NonEmptyString<R> => StringCore.isNotEmpty<R>(value);
	}

	/**
	 * Checks if the given value is a lowercase string.
	 * @example
	 * const values = ["hello", "WORLD"] as const;
	 * const lowerCaseStrings = values.filter(StringPredicate.isLowerCase());
	 * console.log(lowerCaseStrings); // ["hello"]
	 * @returns {function} A predicate function that checks if the value is a lowercase string.
	 * @since v1.0.6
	 */
	public static isLowerCase<T extends unknown>(): PredIsFn<string, Lowercase<string>, T> {
		return <R extends T>(value: R): value is Extract<R, Lowercase<string>> => StringCore.isLowerCase(value);
	}

	/**
	 * Checks if the given value is not a lowercase string.
	 * @example
	 * const values = ["hello", "WORLD"] as const;
	 * const nonLowerCaseStrings = values.filter(StringPredicate.isNotLowerCase());
	 * console.log(nonLowerCaseStrings); // ["WORLD"]
	 * @returns {function} A predicate function that checks if the value is not a lowercase string.
	 * @since v1.0.6
	 */
	public static isNotLowerCase<T extends unknown>(): PredIsNotFn<string, Lowercase<string>, T> {
		return <R extends T>(value: R): value is Exclude<R, Lowercase<string>> => StringCore.isNotLowerCase(value);
	}

	/**
	 * Checks if the given value is an uppercase string.
	 * @example
	 * const values = ["hello", "WORLD"] as const;
	 * const upperCaseStrings = values.filter(StringPredicate.isUpperCase());
	 * console.log(upperCaseStrings); // ["WORLD"]
	 * @returns {function} A predicate function that checks if the value is an uppercase string.
	 * @since v1.0.6
	 */
	public static isUpperCase<T extends unknown>(): PredIsFn<string, Uppercase<string>, T> {
		return <R extends T>(value: R): value is Extract<R, Uppercase<string>> => StringCore.isUpperCase(value);
	}

	/**
	 * Checks if the given value is not an uppercase string.
	 * @example
	 * const values = ["hello", "WORLD"] as const;
	 * const nonUpperCaseStrings = values.filter(StringPredicate.isNotUpperCase());
	 * console.log(nonUpperCaseStrings); // ["hello"]
	 * @returns {function} A predicate function that checks if the value is not an uppercase string.
	 * @since v1.0.6
	 */
	public static isNotUpperCase<T extends unknown>(): PredIsNotFn<string, Uppercase<string>, T> {
		return <R extends T>(value: R): value is Exclude<R, Uppercase<string>> => StringCore.isNotUpperCase(value);
	}

	/**
	 * Checks if the given value starts with the specified prefix.
	 * @example
	 * const values = ["apple", "banana", "apricot"] as const;
	 * const aStrings = values.filter(StringPredicate.startsWith("a"));
	 * console.log(aStrings); // ["apple", "apricot"]
	 * @param {string} prefix - The prefix to check for.
	 * @returns {function} A predicate function that checks if the value starts with the specified prefix.
	 * @since v1.0.6
	 */
	public static startsWith<P extends string>(prefix: P): PredIsFnUnknown<string, PrefixedString<P>> {
		return (value: unknown): value is PrefixedString<P> => StringCore.startsWith(value, prefix);
	}

	/**
	 * Checks if the given value ends with the specified suffix.
	 * @example
	 * const values = ["file.png", "document.pdf", "image.jpeg"] as const;
	 * const pngStrings = values.filter(StringPredicate.endsWith("png"));
	 * console.log(pngStrings); // ["file.png"]
	 * @param {string} suffix - The suffix to check for.
	 * @returns {function} A predicate function that checks if the value ends with the specified suffix.
	 * @since v1.0.6
	 */
	public static endsWith<S extends string>(suffix: S): PredIsFnUnknown<string, SuffixedString<S>> {
		return (value: unknown): value is SuffixedString<S> => StringCore.endsWith(value, suffix);
	}

	/**
	 * Checks if the given value is a {@link NumberString}.
	 * @example
	 * const values = ["123", "abc", "456"] as const;
	 * const numericStrings = values.filter(StringPredicate.isNumeric());
	 * console.log(numericStrings); // ["123", "456"]
	 * @returns {function} A predicate function that checks if the value is a {@link NumberString}.
	 * @since v1.0.6
	 */
	public static isNumeric<T extends unknown>(): PredIsFn<string, NumberString, T> {
		return <R extends T>(value: R): value is Extract<R, NumberString> => StringCore.isNumeric<R>(value);
	}

	/**
	 * Checks if the given value is not a {@link NumberString}.
	 * @example
	 * const values = ["123", "abc", "456"] as const;
	 * const nonNumericStrings = values.filter(StringPredicate.isNotNumeric());
	 * console.log(nonNumericStrings); // ["abc"]
	 * @returns {function} A predicate function that checks if the value is not a {@link NumberString}.
	 * @since v1.0.6
	 */
	public static isNotNumeric<T extends unknown>(): PredIsNotFn<string, NumberString, T> {
		return <R extends T>(value: R): value is Exclude<R, NumberString> => StringCore.isNotNumeric<R>(value);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Check that we have all methods implemented
 */
type BaseType = WithIsPredicates<StringFnMapping> & {
	startsWith: <P extends string>(prefix: P) => PredIsFnUnknown<string, PrefixedString<P>>;
	endsWith: <S extends string>(suffix: S) => PredIsFnUnknown<string, SuffixedString<S>>;
};
void 0 as unknown as typeof StringPredicate satisfies BaseType;
