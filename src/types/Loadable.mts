/**
 * A type that can be loaded directly, Promise or a function that returns the value or a Promise.
 * @template T The type of the value that can be loaded (T can't be a function).
 * @since v0.0.1
 * @example
 * // example resolving a Loadable string
 * async function demo(loadable: Loadable<string>) {
 *   const value1: string = await (typeof loadable === 'function' ? loadable() : loadable);
 *   const value2: string = await resolveLoadable(loadable);
 * }
 */
export type Loadable<T> = T | Promise<T> | (() => T | Promise<T>);

/**
 * Extracts the type of the resolved value of a loadable.
 * @template T The Loadable type.
 * @since v0.2.0
 */
export type ResolvedLoadable<T> = T extends Loadable<infer U> ? U | Promise<U> : never;
