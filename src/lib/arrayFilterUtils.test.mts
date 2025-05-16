import {describe, expect, it} from 'vitest';
import {asyncFilter} from './arrayFilterUtils.mjs';

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
		const calls: Array<[number, number, number[]]> = [];
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
