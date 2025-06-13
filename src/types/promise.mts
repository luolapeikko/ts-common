/**
 * A type that represents a value that can be either a direct value or a Promise that resolves to that value (`T | Promise<T>`)
 * @template T - The type of the value that can be awaited.
 * @example
 * function getValue(): Awaitable<string> {
 *   return 'test';
 * }
 * @since v0.4.2
 */
export type Awaitable<T> = T | Promise<T>;
