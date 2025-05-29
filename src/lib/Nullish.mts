import {type Nullish} from '../types/Nullish.mjs';

/**
 * Type guard check if the given value is null or undefined.
 * @template T The type of the value
 * @param {unknown} value The value to check
 * @returns {boolean} True if the value is null or undefined, otherwise false
 * @example
 * const data = ['demo', null, undefined, 'demo'];
 * const count = data.filter(isNullish).length; // 2
 * @since v0.4.0
 */
export function isNullish(value: Nullish<unknown>): value is null | undefined {
	return value === null || value === undefined;
}

/**
 * Type guard check if the given value is not null or undefined.
 * @template T The type of the value
 * @param {Nullish<T>} value The value to check
 * @returns {value is T} True if the value is neither null nor undefined, otherwise false
 * @example
 * const data = ['demo', null, undefined, 'demo'];
 * const output: string[] = data.filter(isNotNullish);
 * @since v0.4.0
 */
export function isNotNullish<T>(value: Nullish<T>): value is T {
	return value !== null && value !== undefined;
}
