import {RecordCore} from './RecordCore.mjs';

/**
 * The `RecordMapper` class provides utility functions for mapping and transforming record types.
 * @since v1.0.6
 */
export class RecordMapper {
	/**
	 * Pick function to pick keys from an object or use as map function to pick keys from an array
	 * @template K Pick keys
	 * @template T Object type
	 * @param {Iterable<K>} keys keys to pick
	 * @param {T} value to pick from (optional)
	 * @returns {Pick<T, K> | ((current: T) => Pick<T, K>)} picked object or map function
	 * @example
	 * type Data = {demo: string, value: number|null};
	 * const dataArray: Data[] = [{demo: 'hello', value: null}];
	 * const output: Pick<Data, 'demo'>[] = dataArray.map(RecordMapper.pick(['demo']));
	 * @since v1.0.0
	 */
	public static pick<K extends PropertyKey>(keys: Iterable<K>): <T extends Partial<Record<K, unknown>>>(value: T) => Pick<T, K> {
		return <T extends Partial<Record<K, unknown>>>(value: T) => {
			return RecordCore.pick(keys, value);
		};
	}

	/**
	 * Omit function to omit keys from an object or use as map function to omit keys from an array
	 * @template K Omit keys
	 * @template T Object type
	 * @param {Iterable<K>} keys to omit
	 * @returns {Omit<T, K> | ((current: T) => Omit<T, K>)} omitted object or map function
	 * @example
	 * type Data = {demo: string, value: number|null};
	 * const dataArray: Data[] = [{demo: 'hello', value: null}];
	 * const output: Omit<Data, 'demo'>[] = dataArray.map(RecordMapper.omit(['demo']));
	 * @since v1.0.0
	 */
	public static omit<K extends PropertyKey>(keys: Iterable<K>): <T extends Partial<Record<K, unknown>>>(value: T) => Omit<T, K> {
		return <T extends Partial<Record<K, unknown>>>(value: T) => {
			return RecordCore.omit(keys, value);
		};
	}

	public static prop<T, K extends keyof T>(key: K): (value: T) => T[K] {
		return (value: T): T[K] => {
			return value[key];
		};
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/**
 * Creates a function that selects a specific property value from an object.
 *
 * Useful for use with arrays `map` function when extracting a single property from each object.
 * @deprecated Use {@link RecordMapper.prop} instead.
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
export function prop<T extends Record<PropertyKey, any> | any[], K extends keyof T>(key: K): (target: T) => T[K] {
	return RecordMapper.prop(key);
}
