import {describe, expect, it} from 'vitest';
import {type NonEmptyArray} from '../types/NonEmptyArray.mjs';
import {arrayMap, asyncFilter} from './ArrayCore.mjs';

const looseValue: Record<'value', string> = {
	value: 'value',
};

const innerConst = [{value: 'value'} as const];
const neverDataArray: {value: string}[] = [];

describe('deprecated Array functions', () => {
	describe('asyncFilter', () => {
		it('filters synchronously with a sync predicate', async () => {
			const arr = [1, 2, 3, 4];
			const result = await asyncFilter(arr, (item) => item % 2 === 0);
			expect(result).toEqual([2, 4]);
		});

		it('filters asynchronously with an async predicate', async () => {
			const arr = [1, 2, 3, 4];
			const result = await asyncFilter(arr, (item) => Promise.resolve(item > 2));
			expect(result).toEqual([3, 4]);
		});

		it('passes correct arguments to predicate', async () => {
			const arr = [10, 20, 30];
			const calls: [number, number, number[]][] = [];
			await asyncFilter(arr, (item, idx, array) => {
				calls.push([item, idx, array]);
				return true;
			});
			expect(calls).toEqual([
				[10, 0, [10, 20, 30]],
				[20, 1, [10, 20, 30]],
				[30, 2, [10, 20, 30]],
			]);
		});

		it('works with an empty array', async () => {
			const arr: number[] = [];
			const result = await asyncFilter(arr, () => true);
			expect(result).toEqual([]);
		});

		it('works with a Loadable (Promise) input', async () => {
			const arr = Promise.resolve([1, 2, 3, 4]);
			const result = await asyncFilter(arr, (item) => item < 3);
			expect(result).toEqual([1, 2]);
		});

		it('works with a Loadable (Promise) callback input', async () => {
			const arr = Promise.resolve([1, 2, 3, 4]);
			const result = await asyncFilter(
				() => arr,
				(item) => item < 3,
			);
			expect(result).toEqual([1, 2]);
		});

		it('works with an iterable (Set)', async () => {
			const set = new Set([1, 2, 3]);
			const result = await asyncFilter(set, (item) => item !== 2);
			expect(result).toEqual([1, 3]);
		});

		it('handles predicate returning mixed sync/async', async () => {
			const arr = [1, 2, 3];
			const result = await asyncFilter(arr, (item) => (item === 2 ? Promise.resolve(true) : false));
			expect(result).toEqual([2]);
		});
	});
	describe('objectKeys', function () {
		it('should have valid array map types', function () {
			const _constData: NonEmptyArray<'value'> = arrayMap([{value: 'value'}] as const, (value) => value.value);
			expect(_constData).to.deep.equal(['value']);
			const _constValueData: NonEmptyArray<string> = arrayMap([looseValue] as const, (value) => value.value);
			expect(_constValueData).to.deep.equal(['value']);
			const _baseData: 'value'[] = arrayMap(innerConst, (value) => value.value);
			expect(_baseData).to.deep.equal(['value']);
			const _neverData: string[] = arrayMap(neverDataArray, (value) => value.value);
			expect(_neverData).to.deep.equal([]);
		});
	});
});
