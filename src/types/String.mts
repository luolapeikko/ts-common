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
export type NonEmptyString<T> = T extends string ? Exclude<T, EmptyString> : never;

/**
 * String type that represents a number.
 * @since v1.0.2
 */
export type NumberString = `${number}`;

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
