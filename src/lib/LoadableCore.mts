import {type Loadable, type ResolvedLoadable} from '../types/Loadable.mjs';

/**
 * The core Loadable functions.
 * @since v1.0.0
 */
export class LoadableCore {
	/**
	 * Resolves a loadable to a promise
	 * @example
	 * async function demo(loadable: Loadable<string>) {
	 *   const value: string = await LoadableCore.resolve(loadable);
	 * }
	 * @template T The Loadable type.
	 * @param {T} loadable - Loadable value to resolve.
	 * @returns {ResolvedLoadable<T>} Resolved value or Promise that resolves to the value.
	 * @since v1.0.0
	 */
	public static resolve<T extends Loadable<unknown>>(loadable: T): ResolvedLoadable<T> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (typeof loadable === 'function' ? loadable() : loadable) as ResolvedLoadable<T>;
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Resolves a loadable to a promise
 * @deprecated use {@link LoadableCore.resolve} instead
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
	return LoadableCore.resolve(loadable);
}
