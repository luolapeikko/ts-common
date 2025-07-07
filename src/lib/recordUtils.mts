/**
 * Type guard that checks if a value is a record (i.e., an object with property keys).
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a non-null object and not an array; otherwise, false.
 * @since v0.4.6
 */
export function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
	return value != null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Type guard that checks if a value is not a record (i.e., not an object with property keys).
 * @template T - The type of the value to check.
 * @param {T} value - The value to test.
 * @returns {boolean} `true` if the value is not a record; otherwise, `false`.
 * @since v0.4.6
 */
export function isNotRecord<T>(value: T): value is Exclude<T, Record<PropertyKey, unknown>> {
	return !isRecord(value);
}
