import {type Loadable, type ResolvedLoadable} from '../types/Loadable.mjs';

/**
 * Resolves a loadable to a promise
 * @template T The Loadable type.
 * @param {T} loadable - Loadable value to resolve.
 * @returns {ResolvedLoadable<T>} Resolved value or Promise that resolves to the value.
 * @since v0.2.0
 * @example
 * async function demo(loadable: Loadable<string>) {
 *   const value: string = await resolveLoadable(loadable);
 * }
 */
export function resolveLoadable<T extends Loadable<unknown>>(loadable: T): ResolvedLoadable<T> {
	// eslint-disable-next-line
	return typeof loadable === 'function' ? loadable() : loadable as ResolvedLoadable<T>;
}
