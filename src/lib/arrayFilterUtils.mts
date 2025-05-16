import {type Loadable, resolveLoadable} from '../index.mjs';

/**
 * Async filter version of Array.prototype.filter(), with the same signature as its synchronous counterpart.
 * @example
 * asyncFilter([1, 2, 3], (item) => Promise.resolve(item % 2 === 0)); // [2]
 * @template T The type of the array
 * @param {Loadable<Iterable<T>>} list - The iterable to filter
 * @param {(item: T, index: number, array: T[]) => boolean | Promise<boolean>} asyncPredicate - The predicate function
 * @returns {Promise<T[]>} A promise that resolves to the filtered array
 * @since v0.3.7
 */
export async function asyncFilter<T>(
	list: Loadable<Iterable<T>>,
	asyncPredicate: (item: T, index: number, array: T[]) => boolean | Promise<boolean>,
): Promise<T[]> {
	const array = Array.from(await resolveLoadable(list));
	const results = await Promise.all(array.map(asyncPredicate));
	return array.filter((_, index) => results[index]);
}
