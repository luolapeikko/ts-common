import {errorBuilder} from './errorUtils.mjs';

export class PromiseCore {
	public static from<T>(value: null | undefined | T | Promise<T>): Promise<T> {
		if (value && PromiseCore.isNot(value)) {
			return Promise.resolve(value);
		}
		PromiseCore.assert(value);
		return value;
	}

	public static is(value: unknown): value is Promise<unknown>;
	public static is<T>(value: T): value is Extract<T, Promise<unknown>>;
	public static is(value: unknown): value is Promise<unknown> {
		return value instanceof Promise || (value !== null && typeof value === 'object' && typeof (value as Promise<unknown>).then === 'function');
	}

	public static isNot<T>(value: T): value is Exclude<T, Promise<any>> {
		return !PromiseCore.is<T>(value);
	}

	public static assert(value: unknown): asserts value is Promise<unknown>;
	public static assert<T>(value: T): asserts value is Extract<T, Promise<unknown>>;
	public static assert(value: unknown): asserts value is Promise<unknown> {
		if (!PromiseCore.is(value)) {
			throw PromiseCore.buildErr(value, 'Promise');
		}
	}

	public static assertNot<T>(value: T): asserts value is Exclude<T, Promise<any>> {
		if (PromiseCore.is(value)) {
			throw PromiseCore.buildErr(value, 'NotPromise');
		}
	}

	public static buildErr(value: unknown, typeName: 'Promise' | 'NotPromise'): TypeError {
		return errorBuilder(value, typeName);
	}

	/* c8 ignore next 3 */
	private constructor() {
		throw new Error('This class should not be instantiated.');
	}
}
