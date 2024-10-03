/**
 * A non-empty array.
 * @version 0.1.0
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * A non-empty readonly array.
 * @version 0.2.0
 */
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];
