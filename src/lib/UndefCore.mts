import {type Nullable} from '../types/Nullable.mjs';
import {type Nullish} from '../types/Nullish.mjs';
import {type Undef} from '../types/Undef.mjs';

/**
 * Core class for all nullish types.
 * @since v0.5.0
 */
export class UndefCore {
	/**
	 * Type guard check if the given value is undefined.
	 * @param {unknown} value The value to check
	 * @returns {value is undefined} True if the value is undefined, otherwise false
	 * @example
	 * const data = ['demo', undefined, 'demo'];
	 * const count = data.filter(UndefCore.isUndefined).length; // 1
	 * @since v0.5.0
	 */
	public static isUndefined(value: unknown): value is undefined {
		return value === undefined;
	}

	/**
	 * Type guard check if the given value is not undefined.
	 * @template T The type of the value
	 * @param {T | undefined} value The value to check
	 * @returns {value is T} True if the value is not undefined, otherwise false
	 * @example
	 * const data = ['demo', undefined, 'demo'];
	 * const output: string[] = data.filter(UndefCore.isNotUndefined);
	 * @since v0.5.0
	 */
	public static isNotUndefined<T>(value: Undef<T>): value is T {
		return value !== undefined;
	}

	/**
	 * Asserts that the given value is undefined.
	 * @example
	 * const res: undefined = someCall():
	 * UndefCore.assertUndefined(res);
	 * @throws {TypeError} If the given value is not undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.5.0
	 */
	public static assertUndefined(value: unknown): asserts value is undefined {
		if (!UndefCore.isUndefined(value)) {
			throw UndefCore.buildErr(value);
		}
	}

	/**
	 * Asserts that the given value is NOT undefined.
	 * @example
	 * function add(a: number, b: number): number {
	 *   UndefCore.assertNotUndefined(a);
	 *   UndefCore.assertNotUndefined(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.5.0
	 */
	public static assertNotUndefined<T>(value: Undef<T>): asserts value is T {
		if (!UndefCore.isNotUndefined(value)) {
			throw UndefCore.buildErr(value);
		}
	}

	/**
	 * Type guard check if the given value is `null`.
	 * @template T The type of the value
	 * @param {unknown} value The value to check
	 * @returns {boolean} True if the value is null or undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const count = data.filter(UndefCore.isNull).length; // 1
	 * @since v0.5.0
	 */
	public static isNull(value: Nullable<unknown>): value is null {
		return value === null;
	}

	/**
	 * Asserts that the given value is `null`.
	 * @example
	 * const res: null = someCall():
	 * UndefCore.assertNull(res);
	 * @throws {TypeError} If the given value is not null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.5.0
	 */
	public static assertNull(value: unknown): asserts value is null {
		if (!UndefCore.isNull(value)) {
			throw UndefCore.buildErr(value);
		}
	}

	/**
	 * Type guard check if the given value is NOT `null`.
	 * @template T The type of the value
	 * @param {Nullable<T>} value The value to check
	 * @returns {value is T} True if the value is neither null nor undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const output: (string | undefined)[] = data.filter(UndefCore.isNotNull);
	 * @since v0.5.0
	 */
	public static isNotNull<T>(value: Nullable<T>): value is T {
		return !UndefCore.isNull(value);
	}

	/**
	 * Asserts that the given value is NOT `null`.
	 * @example
	 * function add(a: number, b: number): number {
	 *   UndefCore.assertNotNull(a);
	 *   UndefCore.assertNotNull(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.5.0
	 */
	public static assertNotNull<T>(value: Nullable<T>): asserts value is T {
		if (!UndefCore.isNotNull(value)) {
			throw UndefCore.buildErr(value);
		}
	}

	/**
	 * Type guard check if the given value is null or undefined.
	 * @template T The type of the value
	 * @param {unknown} value The value to check
	 * @returns {boolean} True if the value is null or undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const count = data.filter(UndefCore.isNullish).length; // 2
	 * @since v0.5.0
	 */
	public static isNullish(value: Nullish<unknown>): value is null | undefined {
		return value === null || value === undefined;
	}

	/**
	 * Asserts that the given value is null or undefined.
	 * @example
	 * const res: null | undefined = someCall():
	 * NullishCore.assertNullish(res);
	 * @throws {TypeError} If the given value is not null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.5.0
	 */
	public static assertNullish(value: unknown): asserts value is null | undefined {
		if (!UndefCore.isNullish(value)) {
			throw UndefCore.buildErr(value);
		}
	}

	/**
	 * Type guard check if the given value is NOT `null` or `undefined`.
	 * @template T The type of the value
	 * @param {Nullish<T>} value The value to check
	 * @returns {value is T} True if the value is neither null nor undefined, otherwise false
	 * @example
	 * const data = ['demo', null, undefined, 'demo'];
	 * const output: string[] = data.filter(UndefCore.isNotNullish);
	 * @since v0.5.0
	 */
	public static isNotNullish<T>(value: Nullish<T>): value is T {
		return !UndefCore.isNullish(value);
	}

	/**
	 * Asserts that the given value is NOT `null` or `undefined`.
	 * @example
	 * function add(a: number, b: number): number {
	 *   UndefCore.assertNotNullish(a);
	 *   UndefCore.assertNotNullish(b);
	 *   return a + b;
	 * }
	 * @throws {TypeError} If the given value is null or undefined.
	 * @param {unknown} value - The value to assert.
	 * @since v0.5.0
	 */
	public static assertNotNullish(value: unknown): asserts value is NonNullable<unknown> {
		if (!UndefCore.isNotNullish(value)) {
			throw UndefCore.buildErr(value);
		}
	}

	/**
	 * Builds an type error `Value is ${JSON.stringify(value)}`.
	 * @param {unknown} value - The invalid value.
	 * @returns {TypeError} The created error.
	 * @since v0.5.0
	 */
	public static buildErr(value: unknown): TypeError {
		return new TypeError(`Value is ${JSON.stringify(value)}`);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}

/* c8 ignore next 999 */

/**
 * Type guard check if the given value is undefined.
 * @deprecated Use {@link UndefCore.isUndefined} instead
 * @param {unknown} value The value to check
 * @returns {value is undefined} True if the value is undefined, otherwise false
 * @example
 * const data = ['demo', undefined, 'demo'];
 * const count = data.filter(isUndef).length; // 1
 * @since v0.4.0
 */
export function isUndef(value: unknown): value is undefined {
	return UndefCore.isUndefined(value);
}

/**
 * Type guard check if the given value is not undefined.
 * @deprecated Use {@link UndefCore.isNotUndefined} instead
 * @template T The type of the value
 * @param {T | undefined} value The value to check
 * @returns {value is T} True if the value is not undefined, otherwise false
 * @example
 * const data = ['demo', undefined, 'demo'];
 * const output: string[] = data.filter(isNotUndef);
 * @since v0.4.0
 */
export function isNotUndef<T>(value: Undef<T>): value is T {
	return UndefCore.isNotUndefined(value);
}

/**
 * Type guard check if the given value is null or undefined.
 * @deprecated Use {@link UndefCore.isNullish} instead
 * @template T The type of the value
 * @param {unknown} value The value to check
 * @returns {boolean} True if the value is null or undefined, otherwise false
 * @example
 * const data = ['demo', null, undefined, 'demo'];
 * const count = data.filter(isNullish).length; // 2
 * @since v0.4.0
 */
export function isNullish(value: Nullish<unknown>): value is null | undefined {
	return UndefCore.isNullish(value);
}

/**
 * Type guard check if the given value is not null or undefined.
 * @deprecated Use {@link UndefCore.isNotNullish} instead
 * @template T The type of the value
 * @param {Nullish<T>} value The value to check
 * @returns {value is T} True if the value is neither null nor undefined, otherwise false
 * @example
 * const data = ['demo', null, undefined, 'demo'];
 * const output: string[] = data.filter(isNotNullish);
 * @since v0.4.0
 */
export function isNotNullish<T>(value: Nullish<T>): value is T {
	return UndefCore.isNotNullish(value);
}

/**
 * Type guard check if the given value is null.
 * @deprecated Use {@link UndefCore.isNull} instead
 * @template T The type of the value
 * @param {unknown} value The value to check
 * @returns {boolean} True if the value is null, otherwise false
 * @example
 * const data = ['demo', null, 'demo'];
 * const count = data.filter(isNull).length; // 1
 * @since v0.4.0
 */
export function isNull(value: Nullable<unknown>): value is null {
	return UndefCore.isNull(value);
}

/**
 * Type guard check if the given value is not null.
 * @deprecated Use {@link UndefCore.isNotNull} instead
 * @template T The type of the value
 * @param {Nullable<T>} value The value to check
 * @returns {value is T} True if the value is not null, otherwise false
 * @example
 * const data = ['demo', null, 'demo'];
 * const output: string[] = data.filter(isNotNull);
 * @since v0.4.0
 */
export function isNotNull<T>(value: Nullable<T>): value is T {
	return UndefCore.isNotNull(value);
}
