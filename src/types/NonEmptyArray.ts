/**
 * A non-empty array.
 * @since v0.1.0
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * A non-empty readonly array.
 * @since v0.2.0
 */
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];
