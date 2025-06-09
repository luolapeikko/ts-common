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
		return (current: T) => pick(args[0], current);
	}
	const partial = {} as Record<PropertyKey, unknown>;
	for (const key of args[0]) {
		partial[key] = args[1][key];
	}
	return partial;
}
