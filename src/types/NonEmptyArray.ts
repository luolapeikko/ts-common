/**
 * A non-empty array.
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * A non-empty readonly array.
 */
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];
