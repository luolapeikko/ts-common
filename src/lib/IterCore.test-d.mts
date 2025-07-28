import {assertType, describe, it} from 'vitest';
import {IterCore as I} from './IterCore.mjs';

describe('iterableUtils', () => {
	describe('isIterable', () => {
		it('should narrow type to Iterable for iterable types', () => {
			const arr: number[] | null = [1, 2, 3];
			if (I.isIterable(arr)) {
				assertType<Iterable<number>>(arr);
			}
			const str: string | null = 'abc';
			if (I.isIterable(str)) {
				assertType<Iterable<string>>(str);
			}
			const map: Map<string, number> | null = new Map();
			if (I.isIterable(map)) {
				assertType<Iterable<[string, number]>>(map);
			}
			const set: Set<number> | null = new Set<number>();
			if (I.isIterable(set)) {
				assertType<Iterable<number>>(set);
			}
			function* generator(): Generator<number> {
				yield 1;
			}
			const gen = generator();
			if (I.isIterable(gen)) {
				assertType<Iterable<number>>(gen);
			}
		});
		describe('isNotIterable', () => {
			it('should narrow non-iterable types', () => {
				const obj: Iterable<unknown> | {} = {};
				if (I.isNotIterable(obj)) {
					assertType<{}>(obj);
				}
				const num: Iterable<unknown> | number = 123;
				if (I.isNotIterable(num)) {
					assertType<number>(num);
				}
				const bool: Iterable<unknown> | boolean = true;
				if (I.isNotIterable(bool)) {
					assertType<boolean>(bool);
				}
				const nul: Iterable<unknown> | null = null;
				if (I.isNotIterable(nul)) {
					assertType<null>(nul);
				}
				const undef: Iterable<unknown> | undefined = undefined;
				if (I.isNotIterable(undef)) {
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
			if (I.isAsyncIterable(asyncGen)) {
				assertType<AsyncIterable<number>>(asyncGen);
			}
		});
	});
	describe('isNotAsyncIterable', () => {
		it('should narrow non-async iterable types', () => {
			const obj: AsyncIterable<unknown> | {} = {};
			if (I.isNotAsyncIterable(obj)) {
				assertType<{}>(obj);
			}
			const num: AsyncIterable<unknown> | number = 123;
			if (I.isNotAsyncIterable(num)) {
				assertType<number>(num);
			}
			const bool: AsyncIterable<unknown> | boolean = true;
			if (I.isNotAsyncIterable(bool)) {
				assertType<boolean>(bool);
			}
			const nul: AsyncIterable<unknown> | null = null;
			if (I.isNotAsyncIterable(nul)) {
				assertType<null>(nul);
			}
			const undef: AsyncIterable<unknown> | undefined = undefined;
			if (I.isNotAsyncIterable(undef)) {
				// Should not enter this block, type remains undefined
				assertType<undefined>(undef);
			}
		});
	});
});
