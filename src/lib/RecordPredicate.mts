import {IterCore} from './IterCore.mjs';
export class RecordPredicate {
	/**
	 * Creates a predicate function that checks if a specific property of a record is equal to a given value.
	 * @template T - The type of the record (strict overload).
	 * @template K - The key of the property to check.
	 * @template V - The value type of the property (loose overload).
	 * @param {K} key - The key of the property to check.
	 * @param {T[K]} value - The value or iterable values to compare against.
	 * @returns {(target: T) => boolean} A function that takes a record and returns true if the property is equal to the value.
	 */
	public static propEq<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K] | Iterable<T[K]>): (target: T) => boolean;
	public static propEq<V, K extends PropertyKey>(key: K, value: V | Iterable<V>): (obj: Partial<Record<K, V>>) => boolean;
	public static propEq<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K] | Iterable<T[K]>): (target: T) => boolean {
		const values = new Set(IterCore.is(value, true) ? value : [value]);
		return (obj: T): boolean => values.has(obj[key]);
	}

	/**
	 * Creates a predicate function that checks if a specific property of a record is not equal to a given value.
	 * @template T - The type of the record (strict overload).
	 * @template K - The key of the property to check.
	 * @template V - The value type of the property (loose overload).
	 * @param {K} key - The key of the property to check.
	 * @param {T[K]} value - The value to compare against.
	 * @returns {(target: T) => boolean} A function that takes a record and returns true if the property is not equal to the value.
	 */
	public static propNotEq<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K] | Iterable<T[K]>): (target: T) => boolean;
	public static propNotEq<V, K extends PropertyKey>(key: K, value: V | Iterable<V>): (obj: Partial<Record<K, V>>) => boolean;
	public static propNotEq<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K] | Iterable<T[K]>): (target: T) => boolean {
		const values = new Set(IterCore.is(value, true) ? value : [value]);
		console.log(values.forEach((v) => console.log('Value:', v)));
		return (obj: T): boolean => !values.has(obj[key]);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Creates a predicate function that checks whether a given object's property equals the specified value.
 *
 * Supports both strictly typed object structures and looser records with optional properties.
 *
 * Useful for filtering arrays of objects based on property values.
 * @deprecated Use {@link RecordPredicate.propEq} instead.
 * @template T - The object type with known keys (strict overload).
 * @template K - The key of the property to compare.
 * @template V - The value type of the property (loose overload).
 * @overload
 * @param {K} key - The property name to compare.
 * @param {T[K]} value - The value to match against.
 * @returns {(obj: T) => boolean} A predicate for use with arrays of type T.
 * @overload
 * @param {K} key - The property name to compare.
 * @param {V} value - The value to match against.
 * @returns {(obj: Partial<Record<K, V>>) => boolean} A predicate for objects with optional keys of type K.
 * @example
 * // Strict object structure
 * const isAdmin = propEquals<User, 'role'>('role', 'admin');
 * const admins = users.filter(isAdmin);
 * @example
 * // Loosely typed object
 * const isPublished = propEquals('status', 'published');
 * const publishedPosts = posts.filter(isPublished);
 * @since v0.4.2
 */
export function propEquals<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K]): (obj: T) => boolean;
export function propEquals<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean;
export function propEquals<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean {
	return RecordPredicate.propEq(key, value);
}

/**
 * Creates a predicate function that checks whether a given object's property does **not** equal the specified value.
 *
 * Supports both strictly typed object structures and looser records with optional properties.
 *
 * Useful for filtering arrays of objects where you want to exclude items with a certain property value.
 * @deprecated Use {@link RecordPredicate.propNotEq} instead.
 * @template T - The object type with known keys (strict overload).
 * @template K - The key of the property to compare.
 * @template V - The value type of the property (loose overload).
 * @overload
 * @param {K} key - The property name to compare.
 * @param {T[K]} value - The value to check against.
 * @returns {(obj: T) => boolean} A predicate function returning true when `obj[key] !== value`.
 * @overload
 * @param {K} key - The property name to compare.
 * @param {V} value - The value to check against.
 * @returns {(obj: Partial<Record<K, V>>) => boolean} A predicate for loosely typed or optional-key objects.
 * @example
 * // Strict object structure
 * const isNotAdmin = propNotEquals<User, 'role'>('role', 'admin');
 * const nonAdmins = users.filter(isNotAdmin);
 * @example
 * // Loosely typed object
 * const isNotPublished = propNotEquals('status', 'published');
 * const draftsOrArchived = posts.filter(isNotPublished);
 */
export function propNotEquals<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K]): (obj: T) => boolean;
export function propNotEquals<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean;
export function propNotEquals<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean {
	return RecordPredicate.propNotEq(key, value);
}
