import {type Loadable, type ResolvedLoadable} from '../types/Loadable.js';

/**
 * Resolves a loadable to a promise
 * @template T The Loadable type.
 * @param {T} loadable - Loadable value to resolve.
 * @returns {ResolvedLoadable<T>} Resolved value or Promise that resolves to the value.
 * @version 0.2.0
 * @example
 * async function demo(loadable: Loadable<string>) {
 *   const value: string = await resolveLoadable(loadable);
 * }
 */
export function resolveLoadable<T extends Loadable<unknown>>(loadable: T): ResolvedLoadable<T> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return typeof loadable === 'function' ? loadable() : loadable;
}
