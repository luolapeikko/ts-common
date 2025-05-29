/**
 * Value can be T or undefined.
 * @template T The type of the value
 * @example
 * function demo(value: Undef<string>) {
 *   // value: string | undefined
 * }
 * @since v0.4.0
 */
export type Undef<T> = T | undefined;
