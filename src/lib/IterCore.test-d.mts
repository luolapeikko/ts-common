import {assertType, describe, it} from 'vitest';
import {IterCore as I} from './IterCore.mjs';

describe('iterableUtils', () => {
	describe('isIterable', () => {
		it('should narrow type to Iterable for iterable types', () => {
			const arr: number[] | null = [1, 2, 3];
			if (I.is(arr)) {
				assertType<Iterable<number>>(arr);
			}
			const str: string | null = 'abc';
			if (I.is(str)) {
				assertType<Iterable<string>>(str);
			}
			const map: Map<string, number> | null = new Map();
			if (I.is(map)) {
				assertType<Iterable<[string, number]>>(map);
			}
			const set: Set<number> | null = new Set<number>();
			if (I.is(set)) {
				assertType<Iterable<number>>(set);
			}
			function* generator(): Generator<number> {
				yield 1;
			}
			const gen = generator();
			if (I.is(gen)) {
				assertType<Iterable<number>>(gen);
			}
			// @ts-expect-error Argument of type 'number[]' is not assignable to parameter of type 'string[]'.
			if (I.is<string[]>(arr)) {
				assertType<Iterable<number>>(arr);
			}
		});
		describe('isNotIterable', () => {
			it('should narrow non-iterable types', () => {
				const obj: Iterable<unknown> | {} = {};
				if (I.isNot(obj)) {
					assertType<{}>(obj);
				}
				const num: Iterable<unknown> | number = 123;
				if (I.isNot(num)) {
					assertType<number>(num);
				}
				const bool: Iterable<unknown> | boolean = true;
				if (I.isNot(bool)) {
					assertType<boolean>(bool);
				}
				const nul: Iterable<unknown> | null = null;
				if (I.isNot(nul)) {
					assertType<null>(nul);
				}
				const undef: Iterable<unknown> | undefined = undefined;
				if (I.isNot(undef)) {
					// Should not enter this block, type remains undefined
					assertType<undefined>(undef);
				}
			});
		});
	});
	describe('isAsyncIterable', () => {
		it('should narrow type to AsyncIterable for async iterable types', () => {
			async function* asyncGenerator(): AsyncGenerator<number> {
				yield 1;
			}
			const asyncGen: AsyncGenerator<number, any, any> | null = asyncGenerator();
			if (I.isAsync(asyncGen)) {
				assertType<AsyncIterable<number>>(asyncGen);
			}
		});
	});
	describe('isNotAsyncIterable', () => {
		it('should narrow non-async iterable types', () => {
			const obj: AsyncIterable<unknown> | {} = {};
			if (I.isNotAsync(obj)) {
				assertType<{}>(obj);
			}
			const num: AsyncIterable<unknown> | number = 123;
			if (I.isNotAsync(num)) {
				assertType<number>(num);
			}
			const bool: AsyncIterable<unknown> | boolean = true;
			if (I.isNotAsync(bool)) {
				assertType<boolean>(bool);
			}
			const nul: AsyncIterable<unknown> | null = null;
			if (I.isNotAsync(nul)) {
				assertType<null>(nul);
			}
			const undef: AsyncIterable<unknown> | undefined = undefined;
			if (I.isNotAsync(undef)) {
				// Should not enter this block, type remains undefined
				assertType<undefined>(undef);
			}
		});
	});
});
