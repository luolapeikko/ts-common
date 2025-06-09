/**
 * Creates a function that selects a specific property value from an object.
 *
 * Useful for use with arrays `map` function when extracting a single property from each object.
 * @template K Property name in target that will be selected
 * @template T Object target from which the property will be selected
 * @param {K} key The property name to select
 * @param {T} target to select the property value from
 * @returns {(target: T) => T[K]} select value by key from the target
 * @example
 * type Data = {demo: string, value: number|null};
 * const dataArray: Data[] = [{demo: 'hello', value: null}];
 * const output: string[] = dataArray.map(pick(['demo']));
 * @since v0.4.2
 */
export function prop<T extends Record<PropertyKey, any> | any[], K extends keyof T>(key: K): (target: T) => T[K];
export function prop<K extends PropertyKey>(key: K): <T extends Record<K, any>>(target: T) => T[K];
export function prop(key: any) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	return (target: any): any => target[key];
}

/**
 * Creates a predicate function that checks whether a given object's property equals the specified value.
 *
 * Supports both strictly typed object structures and looser records with optional properties.
 *
 * Useful for filtering arrays of objects based on property values.
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
export function propEquals(key: any, value: any) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	return (obj: any) => obj[key] === value;
}

/**
 * Creates a predicate function that checks whether a given object's property does **not** equal the specified value.
 *
 * Supports both strictly typed object structures and looser records with optional properties.
 *
 * Useful for filtering arrays of objects where you want to exclude items with a certain property value.
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
export function propNotEquals(key: any, value: any) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	return (obj: any) => obj[key] !== value;
}
