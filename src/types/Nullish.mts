/**
 * Value can be T, null or undefined;
 * @template T The type of the value
 * @example
 * function demo(value: Nullish<string>) {
 *   // value: string | null | undefined
 * }
 * @since v0.3.4
 */
export type Nullish<T> = T | null | undefined;
