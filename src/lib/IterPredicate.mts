/**
 * The `IterPredicate` class provides utility functions for creating predicate functions for Iterable properties.
 * @since v1.1.3
 */
export class IterPredicate {
	/**
	 * Creates a predicate function that checks if a specific item is present in an Iterable.
	 * @example
	 * const values = ['a', 'b', 'c'] as const;
	 * values.filter(IterPredicate.oneOf('a')); // ['a']
	 * @template P, T The type of the item to check for.
	 * @param {P} item - The item to check for.
	 * @returns {(currentItem: P) => boolean} A predicate function.
	 * @since v1.1.3
	 */
	public static oneOf<P, T extends P>(item: T): (currentItem: P) => boolean {
		return (currentItem: P): boolean => currentItem === item;
	}

	/**
	 * Creates a predicate function that checks if a specific item is not present in an Iterable.
	 * @example
	 * const values = ['a', 'b', 'c'] as const;
	 * values.filter(IterPredicate.notOneOf('a')); // ['b', 'c']
	 * @template P, T The type of the item to check for.
	 * @param {P} item - The item to check for.
	 * @returns {(currentItem: P) => boolean} A predicate function.
	 * @since v1.1.3
	 */
	public static notOneOf<P, T extends P = P>(item: T): (currentItem: P) => boolean {
		return (currentItem: P): boolean => currentItem !== item;
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
