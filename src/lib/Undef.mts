import {type Undef} from '../types/Undef.mjs';

/**
 * Type guard check if the given value is undefined.
 * @param {unknown} value The value to check
 * @returns {value is undefined} True if the value is undefined, otherwise false
 * @example
 * const data = ['demo', undefined, 'demo'];
 * const count = data.filter(isUndef).length; // 1
 * @since v0.4.0
 */
export function isUndef(value: unknown): value is undefined {
	return value === undefined;
}

/**
 * Type guard check if the given value is not undefined.
 * @template T The type of the value
 * @param {T | undefined} value The value to check
 * @returns {value is T} True if the value is not undefined, otherwise false
 * @example
 * const data = ['demo', undefined, 'demo'];
 * const output: string[] = data.filter(isNotUndef);
 * @since v0.4.0
 */
export function isNotUndef<T>(value: Undef<T>): value is T {
	return value !== undefined;
}
