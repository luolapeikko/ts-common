/**
 * Value can be T, null or undefined;
 * @template T The type of the value
 * @example
 * function demo(value: Nullish<string>) {
 *   // value: string | null | undefined
 * }
 */
export type Nullish<T> = T | null | undefined;

/**
 * Value can be T or null;
 * @template T The type of the value
 * @example
 * function demo(value: Nullable<string>) {
 *   // value: string | null
 * }
 */
export type Nullable<T> = T | null;
