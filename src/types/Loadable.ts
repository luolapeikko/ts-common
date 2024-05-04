/**
 * A type that can be loaded directly, Promise or a function that returns the value or a Promise.
 *
 * @template T The type of the value that can be loaded, Note: 'T' can't be a function as resolving a function would be problematic.
 * @example
 * import type {Loadable} from '@luolapeikko/ts-common';
 * // example resolving a Loadable boolean
 * async function resolveBoolean(loadable: Loadable<boolean>): boolean {
 *  return await (typeof loadable === 'function' ? loadable() : loadable);
 * }
 */
export type Loadable<T> = T | Promise<T> | (() => T | Promise<T>);
