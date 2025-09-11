import type {MutableRecord, ObjectMappedArray, ObjectMappedArrayTuples} from '../types/object.mjs';

/**
 * The core Object functions
 * @since v1.0.0
 */
export class RecordCore {
	/**
	 * Checks if the given value is an Record.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} True if the value is an object; otherwise, false.
	 * @since v1.0.0
	 */
	public static is(value: unknown): value is Record<PropertyKey, unknown> {
		return typeof value === 'object' && value !== null && !Array.isArray(value);
	}

	/**
	 * Checks if the given value is not an Record.
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} True if the value is not an object; otherwise, false.
	 * @since v1.0.0
	 */
	public static isNot<T>(value: T): value is Exclude<T, Record<PropertyKey, unknown>> {
		return !RecordCore.is(value);
	}

	/**
	 * Asserts that the given value is an Record.
	 * @param {unknown} value - The value to check.
	 * @throws {TypeError} If the value is not an object.
	 * @since v1.0.0
	 */
	public static assert(value: unknown): asserts value is Record<PropertyKey, unknown> {
		if (!RecordCore.is(value)) {
			throw RecordCore.buildErr(value);
		}
	}

	/**
	 * Type-safe Object.keys() with overload for NonEmptyArray
	 * @example
	 * const result1: NonEmptyReadonlyArray<'key'> = RecordCore.keys({key: 'value'} as const);
	 * const result2: Array<'key'> = RecordCore.keys({key: 'value'});
	 * const result3: Array<string> = RecordCore.keys<Record<string, string>>({key: 'value'});
	 * const result4: [] = RecordCore.keys({});
	 * @template R - The object shape
	 * @param {R} value - The object shape to get the values from
	 * @returns {ObjectMappedArray<R, keyof R>} Array of object keys
	 * @since v1.0.0
	 */
	public static keys<R extends object>(value: R): ObjectMappedArray<R, keyof R> {
		return Object.keys(value) as ObjectMappedArray<R, keyof R>;
	}

	/**
	 * Type-safe Object.values() with overload for NonEmptyArray
	 * @example
	 * const result1: NonEmptyReadonlyArray<'value'> = RecordCore.values({key: 'value'} as const);
	 * const result2: Array<string> = RecordCore.values({key: 'value'});
	 * const result3: [] = RecordCore.values({});
	 * @template R - The object shape
	 * @param {R} value - The object shape to get the values from
	 * @returns {ObjectMappedArray<R, R[keyof R]>} Array of object values
	 * @since v1.0.0
	 */
	public static values<R extends object>(value: R): ObjectMappedArray<R, R[keyof R]> {
		return Object.values(value) as ObjectMappedArray<R, R[keyof R]>;
	}

	/**
	 * Type-safe Object.entries() with overload for NonEmptyArray
	 * @example
	 * const result1: NonEmptyReadonlyArray<['key', 'value']> = RecordCore.entries({key: 'value'} as const);
	 * const result2: Array<['key', string]> = RecordCore.entries({key: 'value'});
	 * const result3: Array<[string, string]> = RecordCore.entries<Record<string, string>>({key: 'value'});
	 * const result4: [] = RecordCore.entries({});
	 * @template R - The object shape
	 * @param {R} value - The object shape to get the values from
	 * @returns {ObjectMappedArrayTuples<R>} Array of tuples with key and value
	 * @since v1.0.0
	 */
	public static entries<R extends object>(value: R): ObjectMappedArrayTuples<R> {
		return Object.entries(value) as ObjectMappedArrayTuples<R>;
	}

	/**
	 * Omit function to omit keys from an object or use as map function to omit keys from an array
	 * @template K Omit keys
	 * @template T Object type
	 * @param {Iterable<K>} keys to omit
	 * @param {T} data to omit from (optional)
	 * @returns {Omit<T, K> | ((current: T) => Omit<T, K>)} omitted object or map function
	 * @example
	 * type Data = {demo: string, value: number|null};
	 * const data: Data = {demo: 'hello', value: null};
	 * const output: Omit<Data, 'value'> = RecordCore.omit(['value'], data);
	 * const dataArray: Data[] = [{demo: 'hello', value: null}];
	 * const output: Omit<Data, 'demo'>[] = dataArray.map(RecordCore.omit(['demo']));
	 * @since v1.0.0
	 */
	public static omit<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(keys: Iterable<K>, data: T): Omit<T, K>;
	public static omit<K extends PropertyKey>(keys: Iterable<K>): <T extends Partial<Record<K, unknown>>>(value: T) => Omit<T, K>;
	public static omit<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(
		...args: [Iterable<K>] | [Iterable<K>, Record<PropertyKey, unknown>]
	): Record<PropertyKey, unknown> | ((current: T) => Record<PropertyKey, unknown>) {
		if (args.length === 1) {
			return (current: T) => RecordCore.omit(args[0], current);
		}
		if (RecordCore.isNot(args[1])) {
			throw new TypeError('omit: The second argument must be an object.');
		}
		const partial = {...args[1]};
		for (const key of args[0]) {
			delete partial[key];
		}
		return partial;
	}

	/**
	 * Pick function to pick keys from an object or use as map function to pick keys from an array
	 * @template K Pick keys
	 * @template T Object type
	 * @param {Iterable<K>} keys keys to pick
	 * @param {T} value to pick from (optional)
	 * @returns {Pick<T, K> | ((current: T) => Pick<T, K>)} picked object or map function
	 * @example
	 * type Data = {demo: string, value: number|null};
	 * const data: Data = {demo: 'hello', value: null};
	 * const output: Pick<Data, 'value'> = RecordCore.pick(['value'], data);
	 * const dataArray: Data[] = [{demo: 'hello', value: null}];
	 * const output: Pick<Data, 'demo'>[] = dataArray.map(RecordCore.pick(['demo']));
	 * @since v1.0.0
	 */
	public static pick<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(keys: Iterable<K>, value: T): Pick<T, K>;
	public static pick<K extends PropertyKey>(keys: Iterable<K>): <T extends Partial<Record<K, unknown>>>(value: T) => Pick<T, K>;
	public static pick<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(
		...args: [Iterable<K>] | [Iterable<K>, Record<PropertyKey, unknown>]
	): Record<PropertyKey, unknown> | ((current: T) => Record<PropertyKey, unknown>) {
		if (args.length === 1) {
			return (current: T) => RecordCore.pick(args[0], current);
		}
		if (RecordCore.isNot(args[1])) {
			throw new TypeError('pick: The second argument must be an object.');
		}
		const partial = {} as Record<PropertyKey, unknown>;
		for (const key of args[0]) {
			partial[key] = args[1][key];
		}
		return partial;
	}

	/**
	 * Creates a shallow clone of the given object, making all properties writable.
	 * @template T - The type of the object to clone.
	 * @param {T} obj - The object to clone.
	 * @returns {MutableRecord<T>} A new object with all properties writable.
	 * @since v1.0.0
	 */
	public static clone<T extends object>(obj: T): MutableRecord<T> {
		RecordCore.assert(obj);
		const proto = Object.getPrototypeOf(obj) as object | null;
		const clone = Object.create(typeof proto === 'object' || proto === null ? proto : Object.prototype) as Record<PropertyKey, unknown>;
		for (const key of Reflect.ownKeys(obj)) {
			const desc = Object.getOwnPropertyDescriptor(obj, key)!;
			desc.configurable = true;
			if ('writable' in desc) {
				desc.writable = true;
			}
			Object.defineProperty(clone, key, desc);
		}
		return clone as MutableRecord<T>;
	}

	/**
	 * Creates a function that selects a specific property value from an object.
	 *
	 * Useful for use with arrays `map` function when extracting a single property from each object.
	 * @template K Property name in target that will be selected
	 * @template T Object target from which the property will be selected
	 * @param {K} key The property name to select
	 * @returns {(target: T) => T[K]} select value by key from the target
	 * @example
	 * const user1: User = {id: 1, name: 'Alice', role: 'admin', active: true};
	 * const getName = ObjCore.onKey('name');
	 * const output: string = getName(user1);
	 * @since v1.0.0
	 */
	public static onKey<T extends Record<PropertyKey, any> | any[], K extends keyof T>(key: K): (target: T) => T[K];
	public static onKey<K extends PropertyKey>(key: K): <T extends Record<K, any>>(target: T) => T[K];
	public static onKey<T extends Record<PropertyKey, any> | any[], K extends keyof T>(key: K): (target: T) => T[K] {
		return (target: T): T[K] => target[key];
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
	 * const isAdmin = RecordCore.onKeyEqual<User, 'role'>('role', 'admin');
	 * const admins = users.filter(isAdmin);
	 * @example
	 * // Loosely typed object
	 * const isPublished = RecordCore.onKeyEqual('status', 'published');
	 * const publishedPosts = posts.filter(isPublished);
	 * @since v1.0.0
	 */
	public static onKeyEqual<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K]): (obj: T) => boolean;
	public static onKeyEqual<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean;
	public static onKeyEqual<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean {
		return (obj: Partial<Record<K, V>>): boolean => obj[key] === value;
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
	 * const isNotAdmin = RecordCore.onKeyNotEqual<User, 'role'>('role', 'admin');
	 * const nonAdmins = users.filter(isNotAdmin);
	 * @example
	 * // Loosely typed object
	 * const isNotPublished = RecordCore.onKeyNotEqual('status', 'published');
	 * const draftsOrArchived = posts.filter(isNotPublished);
	 * @since v1.0.0
	 */
	public static onKeyNotEqual<T extends Record<PropertyKey, any>, K extends keyof T>(key: K, value: T[K]): (obj: T) => boolean;
	public static onKeyNotEqual<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean;
	public static onKeyNotEqual<V, K extends PropertyKey>(key: K, value: V): (obj: Partial<Record<K, V>>) => boolean {
		return (obj: Partial<Record<K, V>>): boolean => obj[key] !== value;
	}

	/**
	 * Builds an type error `Invalid object: ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v1.0.0
	 */
	public static buildErr(value: unknown): TypeError {
		return new TypeError(`Invalid object: ${JSON.stringify(value)}`);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/* c8 ignore next 999 */

/*
 * Deprecated functions until next major version
 */

type KeyCallback<O extends Record<PropertyKey, any>, K extends keyof O> = (key: K, value: O[K], object: O) => boolean;

/**
 * Filter and include specific keys from an object (Based on https://github.com/sindresorhus/filter-obj)
 * @deprecated use {@link RecordCore.pick} instead
 * @example
 * const object = {
 *   foo: true,
 *   bar: false
 * };
 * const newObject = includeKeys(object, (key, value, obj) => value === true); //=> {foo: true}
 * const newObject = includeKeys(object, ['bar']); //=> {bar: false}
 * @template O - The object to filter and include keys from
 * @template K - The key type
 * @param {O} object - The object to filter and include keys from
 * @param {Iterable<K> | KeyCallback<O, K>} keys - The keys or keysCallback to include from the object
 * @returns {Partial<O>} A new object with the included keys
 * @since v0.2.8
 */
export function includeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keys: Iterable<K>): Pick<O, K>;
export function includeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyCallback: KeyCallback<O, K>): Partial<O>;
export function includeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyOrCallback: Iterable<K> | KeyCallback<O, K>): Partial<O> {
	const isCallback = typeof keyOrCallback === 'function';
	const keys = isCallback ? Reflect.ownKeys(object) : Array.from(keyOrCallback);
	const result = keys.reduce<Partial<O>>((acc, key) => {
		const descriptor = Object.getOwnPropertyDescriptor(object, key);
		if (!descriptor?.enumerable) {
			return acc;
		}
		if (isCallback) {
			if (keyOrCallback(key as K, object[key as K], object)) {
				Object.defineProperty(acc, key, descriptor);
			}
		} else {
			Object.defineProperty(acc, key, descriptor);
		}
		return acc;
	}, {});
	return Object.setPrototypeOf(result, Object.getPrototypeOf(object) as object | null) as Partial<O>;
}

type DistributiveOmit<Value, Key extends PropertyKey> = Value extends unknown ? Omit<Value, Key> : never;

/**
 * Filter and exclude specific keys from an object (Based on https://github.com/sindresorhus/filter-obj)
 * @deprecated use {@link RecordCore.omit} instead
 * @example
 * const object = {
 *   foo: true,
 *   bar: false
 * };
 * const newObject = excludeKeys(object, (key, value) => value === true); //=> {bar: false}
 * const newObject = excludeKeys(object, ['bar']); //=> {foo: true}
 * @template O - The object to filter and exclude keys from
 * @template K - The key type
 * @param {O} object - The object to filter and exclude keys from
 * @param {Iterable<K> | KeyCallback<O, K>} key - The keys or keysCallback to exclude from the object
 * @returns {Partial<O>} A new object with the excluded keys
 * @since v0.2.8
 */
export function excludeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, key: Iterable<K>): DistributiveOmit<O, K>;
export function excludeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyCallback: KeyCallback<O, K>): Partial<O>;
export function excludeKeys<O extends Record<PropertyKey, any>, K extends keyof O>(object: O, keyOrCallback: Iterable<K> | KeyCallback<O, K>): Partial<O> {
	if (typeof keyOrCallback === 'function') {
		return includeKeys(object, (key, value, object) => !keyOrCallback(key as K, value as O[K], object));
	}
	const keySet = new Set(keyOrCallback);
	return includeKeys(object, (key) => !keySet.has(key as K));
}

/**
 * Type-safe Object.entries() with overload for NonEmptyArray
 * @deprecated Use {@link RecordCore.entries} instead
 * @example
 * const result1: NonEmptyReadonlyArray<['key', 'value']> = objectEntries({key: 'value'} as const);
 * const result2: Array<['key', string]> = objectEntries({key: 'value'});
 * const result3: Array<[string, string]> = objectEntries<Record<string, string>>({key: 'value'});
 * const result4: [] = objectEntries({});
 * @template R - The object shape
 * @param {R} value - The object shape to get the values from
 * @returns {ObjectMappedArrayTuples<R>} Array of tuples with key and value
 * @since v0.2.0
 */
export function objectEntries<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArrayTuples<R> {
	return RecordCore.entries<R>(value);
}

/**
 * Type-safe Object.keys() with overload for NonEmptyArray
 * @deprecated Use {@link RecordCore.keys} instead
 * @example
 * const result1: NonEmptyReadonlyArray<'key'> = objectKeys({key: 'value'} as const);
 * const result2: Array<'key'> = objectKeys({key: 'value'});
 * const result3: Array<string> = objectKeys<Record<string, string>>({key: 'value'});
 * const result4: [] = objectKeys({});
 * @template R - The object shape
 * @param {R} value - The object shape to get the values from
 * @returns {ObjectMappedArray<R, keyof R>} Array of object keys
 * @since v0.2.0
 */
export function objectKeys<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArray<R, keyof R> {
	return RecordCore.keys<R>(value);
}
/**
 * Type-safe Object.values() with overload for NonEmptyArray
 * @deprecated Use {@link RecordCore.values} instead
 * @example
 * const result1: NonEmptyReadonlyArray<'value'> = objectValues({key: 'value'} as const);
 * const result2: Array<string> = objectValues({key: 'value'});
 * const result3: [] = objectValues({});
 * @template R - The object shape
 * @param {R} value - The object shape to get the values from
 * @returns {ObjectMappedArray<R, R[keyof R]>} Array of object values
 * @since v0.2.0
 */
export function objectValues<R extends Record<string | number | symbol, unknown>>(value: R): ObjectMappedArray<R, R[keyof R]> {
	return RecordCore.values<R>(value);
}

/**
 * Type guard that checks if a value is a record (i.e., an object with property keys).
 * @deprecated Use {@link RecordCore.is} instead
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a non-null object and not an array; otherwise, false.
 * @since v0.4.6
 */
export function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
	return RecordCore.is(value);
}

/**
 * Type guard that checks if a value is not a record (i.e., not an object with property keys).
 * @deprecated Use {@link RecordCore.isNot} instead
 * @template T - The type of the value to check.
 * @param {T} value - The value to test.
 * @returns {boolean} `true` if the value is not a record; otherwise, `false`.
 * @since v0.4.6
 */
export function isNotRecord<T>(value: T): value is Exclude<T, Record<PropertyKey, unknown>> {
	return RecordCore.isNot<T>(value);
}

/**
 * Pick function to pick keys from an object or use as map function to pick keys from an array
 * @deprecated Use {@link RecordCore.pick} instead
 * @template K Pick keys
 * @template T Object type
 * @param {Iterable<K>} keys keys to pick
 * @param {T} value to pick from (optional)
 * @returns {Pick<T, K> | ((current: T) => Pick<T, K>)} picked object or map function
 * @example
 * type Data = {demo: string, value: number|null};
 * const data: Data = {demo: 'hello', value: null};
 * const output: Pick<Data, 'value'> = pick(['value'], data);
 * const dataArray: Data[] = [{demo: 'hello', value: null}];
 * const output: Pick<Data, 'demo'>[] = dataArray.map(pick(['demo']));
 * @since v0.4.0
 */
export function pick<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(keys: Iterable<K>, value: T): Pick<T, K>;
export function pick<K extends PropertyKey>(keys: Iterable<K>): <T extends Partial<Record<K, unknown>>>(value: T) => Pick<T, K>;
export function pick<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(
	...args: [Iterable<K>] | [Iterable<K>, Record<PropertyKey, unknown>]
): Record<PropertyKey, unknown> | ((current: T) => Record<PropertyKey, unknown>) {
	if (args.length === 1) {
		return RecordCore.pick<K>(...args);
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return RecordCore.pick<K, T>(args[0], args[1] as any);
}

/**
 * Omit function to omit keys from an object or use as map function to omit keys from an array
 * @deprecated Use {@link RecordCore.omit} instead
 * @template K Omit keys
 * @template T Object type
 * @param {Iterable<K>} keys to omit
 * @param {T} data to omit from (optional)
 * @returns {Omit<T, K> | ((current: T) => Omit<T, K>)} omitted object or map function
 * @example
 * type Data = {demo: string, value: number|null};
 * const data: Data = {demo: 'hello', value: null};
 * const output: Omit<Data, 'value'> = omit(['value'], data);
 * const dataArray: Data[] = [{demo: 'hello', value: null}];
 * const output: Omit<Data, 'demo'>[] = dataArray.map(omit(['demo']));
 * @since v0.4.1
 */
export function omit<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(keys: Iterable<K>, data: T): Omit<T, K>;
export function omit<K extends PropertyKey>(keys: Iterable<K>): <T extends Partial<Record<K, unknown>>>(value: T) => Omit<T, K>;
export function omit<K extends PropertyKey, T extends Partial<Record<K, unknown>>>(
	...args: [Iterable<K>] | [Iterable<K>, Record<PropertyKey, unknown>]
): Record<PropertyKey, unknown> | ((current: T) => Record<PropertyKey, unknown>) {
	if (args.length === 1) {
		return RecordCore.omit<K>(...args);
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return RecordCore.omit<K, T>(args[0], args[1] as any);
}
