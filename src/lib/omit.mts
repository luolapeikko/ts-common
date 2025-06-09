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
		return (current: T) => omit(args[0], current);
	}
	if (!args[1] || typeof args[1] !== 'object' || Array.isArray(args[1])) {
		throw new TypeError('omit: The second argument must be an object.');
	}
	const partial = {...args[1]};
	for (const key of args[0]) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete partial[key];
	}
	return partial;
}
