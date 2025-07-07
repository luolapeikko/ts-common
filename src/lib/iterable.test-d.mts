import {assertType, describe, it} from 'vitest';
import {isAsyncIterable, isIterable, isNotAsyncIterable, isNotIterable} from './iterable.mjs';

describe('iterableUtils', () => {
	describe('isIterable', () => {
		it('should narrow type to Iterable for iterable types', () => {
			const arr: number[] | null = [1, 2, 3];
			if (isIterable(arr)) {
				assertType<Iterable<number>>(arr);
			}
			const str: string | null = 'abc';
			if (isIterable(str)) {
				assertType<Iterable<string>>(str);
			}
			const map: Map<string, number> | null = new Map();
			if (isIterable(map)) {
				assertType<Iterable<[string, number]>>(map);
			}
			const set: Set<number> | null = new Set<number>();
			if (isIterable(set)) {
				assertType<Iterable<number>>(set);
			}
			function* generator(): Generator<number> {
				yield 1;
			}
			const gen = generator();
			if (isIterable(gen)) {
				assertType<Iterable<number>>(gen);
			}
		});
		describe('isNotIterable', () => {
			it('should narrow non-iterable types', () => {
				const obj: Iterable<unknown> | {} = {};
				if (isNotIterable(obj)) {
					assertType<{}>(obj);
				}
				const num: Iterable<unknown> | number = 123;
				if (isNotIterable(num)) {
					assertType<number>(num);
				}
				const bool: Iterable<unknown> | boolean = true;
				if (isNotIterable(bool)) {
					assertType<boolean>(bool);
				}
				const nul: Iterable<unknown> | null = null;
				if (isNotIterable(nul)) {
					assertType<null>(nul);
				}
				const undef: Iterable<unknown> | undefined = undefined;
				if (isNotIterable(undef)) {
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
			if (isAsyncIterable(asyncGen)) {
				assertType<AsyncIterable<number>>(asyncGen);
			}
		});
	});
	describe('isNotAsyncIterable', () => {
		it('should narrow non-async iterable types', () => {
			const obj: AsyncIterable<unknown> | {} = {};
			if (isNotAsyncIterable(obj)) {
				assertType<{}>(obj);
			}
			const num: AsyncIterable<unknown> | number = 123;
			if (isNotAsyncIterable(num)) {
				assertType<number>(num);
			}
			const bool: AsyncIterable<unknown> | boolean = true;
			if (isNotAsyncIterable(bool)) {
				assertType<boolean>(bool);
			}
			const nul: AsyncIterable<unknown> | null = null;
			if (isNotAsyncIterable(nul)) {
				assertType<null>(nul);
			}
			const undef: AsyncIterable<unknown> | undefined = undefined;
			if (isNotAsyncIterable(undef)) {
				// Should not enter this block, type remains undefined
				assertType<undefined>(undef);
			}
		});
	});
});
