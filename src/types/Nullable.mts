/**
 * Value can be T or null;
 * @template T The type of the value
 * @example
 * function demo(value: Nullable<string>) {
 *   // value: string | null
 * }
 * @since v0.3.4
 */
export type Nullable<T> = T | null;
