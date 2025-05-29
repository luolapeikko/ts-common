import {type Nullable} from '../types/Nullable.mjs';

/**
 * Type guard check if the given value is null.
 * @template T The type of the value
 * @param {unknown} value The value to check
 * @returns {boolean} True if the value is null, otherwise false
 * @example
 * const data = ['demo', null, 'demo'];
 * const count = data.filter(isNull).length; // 1
 * @since v0.4.0
 */
export function isNull(value: Nullable<unknown>): value is null {
	return value === null;
}

/**
 * Type guard check if the given value is not null.
 * @template T The type of the value
 * @param {Nullable<T>} value The value to check
 * @returns {value is T} True if the value is not null, otherwise false
 * @example
 * const data = ['demo', null, 'demo'];
 * const output: string[] = data.filter(isNotNull);
 * @since v0.4.0
 */
export function isNotNull<T>(value: Nullable<T>): value is T {
	return value !== null;
}
