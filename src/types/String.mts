import type {NonBaseType} from './helper.mjs';

/**
 * Helper type to exclude a specific string type from a broader string type.
 */
export type NotStringType<T, Strict extends string> = NonBaseType<T, string, Strict>;

/**
 * Empty string type.
 * @since v1.0.2
 */
export type EmptyString = '';

/**
 * Non-empty string type.
 * @template T - The string type to exclude empty strings from.
 * @since v1.0.2
 */
export type NonEmptyString<T> = NonBaseType<T, string, ''>;

/**
 * String type that represents a number.
 * @since v1.0.2
 */
export type NumberString = `${number}`;

/**
 * Non-numeric string type.
 * @since v1.0.6
 */
export type NonNumberString<T> = NonBaseType<T, string, NumberString>;

/**
 * Prefixed string type.
 * @template P - The prefix to include in the string.
 * @since v1.0.2
 */
export type PrefixedString<P extends string> = `${P}${string}`;

/**
 * Suffixed string type.
 * @template S - The suffix to include in the string.
 * @since v1.0.2
 */
export type SuffixedString<S extends string> = `${string}${S}`;

/**
 * Mapping type for "is" and "isNot" method names and return types for Core and Predicate classes.
 */
export type StringFnMapping = {
	'': [string, string];
	Empty: [string, EmptyString];
	LowerCase: [string, Lowercase<string>];
	UpperCase: [string, Uppercase<string>];
	Numeric: [string, NumberString];
};
