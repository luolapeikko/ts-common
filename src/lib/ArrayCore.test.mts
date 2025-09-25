import {describe, expect, it} from 'vitest';
import {type NonEmptyArray} from '../types/NonEmptyArray.mjs';
import {ArrayCore as A} from './ArrayCore.mjs';

const looseValue: Record<'value', string> = {
	value: 'value',
};

const innerConst = [{value: 'value'} as const];
const neverDataArray: {value: string}[] = [];

describe('ArrayCore', () => {
	describe('filter', () => {
		it('filters synchronously with a sync predicate', () => {
			const arr = [1, 2, 3, 4];
			const result = A.filter(arr, (item) => item % 2 === 0);
			expect(result).toEqual([2, 4]);
		});
		it('passes correct arguments to predicate', () => {
			const arr = [10, 20, 30];
			const calls: [number, number, number[]][] = [];
			A.filter(arr, (item, idx, array) => {
				calls.push([item, idx, array]);
				return true;
			});
			expect(calls).toEqual([
				[10, 0, [10, 20, 30]],
				[20, 1, [10, 20, 30]],
				[30, 2, [10, 20, 30]],
			]);
		});

		it('works with an empty array', () => {
			const arr: number[] = [];
			const result = A.filter(arr, () => true);
			expect(result).toEqual([]);
		});

		it('works with an iterable (Set)', () => {
			const set = new Set([1, 2, 3]);
			const result = A.filter(
				() => set,
				(item) => item !== 2,
			);
			expect(result).toEqual([1, 3]);
		});
	});
	describe('asyncFilter', () => {
		it('filters synchronously with a sync predicate', async () => {
			const arr = [1, 2, 3, 4];
			const result = await A.asyncFilter(arr, (item) => item % 2 === 0);
			expect(result).toEqual([2, 4]);
		});

		it('filters asynchronously with an async predicate', async () => {
			const arr = [1, 2, 3, 4];
			const result = await A.asyncFilter(arr, (item) => Promise.resolve(item > 2));
			expect(result).toEqual([3, 4]);
		});

		it('passes correct arguments to predicate', async () => {
			const arr = [10, 20, 30];
			const calls: [number, number, number[]][] = [];
			await A.asyncFilter(arr, (item, idx, array) => {
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
			const result = await A.asyncFilter(arr, () => true);
			expect(result).toEqual([]);
		});

		it('works with a Loadable (Promise) input', async () => {
			const arr = Promise.resolve([1, 2, 3, 4]);
			const result = await A.asyncFilter(arr, (item) => item < 3);
			expect(result).toEqual([1, 2]);
		});

		it('works with a Loadable (Promise) callback input', async () => {
			const arr = Promise.resolve([1, 2, 3, 4]);
			const result = await A.asyncFilter(
				() => arr,
				(item) => item < 3,
			);
			expect(result).toEqual([1, 2]);
		});

		it('works with an iterable (Set)', async () => {
			const set = new Set([1, 2, 3]);
			const result = await A.asyncFilter(set, (item) => item !== 2);
			expect(result).toEqual([1, 3]);
		});

		it('handles predicate returning mixed sync/async', async () => {
			const arr = [1, 2, 3];
			const result = await A.asyncFilter(arr, (item) => (item === 2 ? Promise.resolve(true) : false));
			expect(result).toEqual([2]);
		});
	});
	describe('objectKeys', function () {
		it('should have valid array map types', function () {
			const _staticKeys: readonly ('value1' | 'value2' | 'value3')[] = ['value1', 'value2', 'value3'] as const;
			const _readonlyBase = A.map(_staticKeys, (value) => ({value}));
			expect(_readonlyBase).to.deep.equal([{value: 'value1'}, {value: 'value2'}, {value: 'value3'}]);
			const _constData: NonEmptyArray<'value'> = A.map([{value: 'value'}] as const, (value) => value.value);
			expect(_constData).to.deep.equal(['value']);
			const _constValueData: NonEmptyArray<string> = A.map([looseValue] as const, (value) => value.value);
			expect(_constValueData).to.deep.equal(['value']);
			const _baseData: 'value'[] = A.map(innerConst, (value) => value.value);
			expect(_baseData).to.deep.equal(['value']);
			const _neverData: string[] = A.map(neverDataArray, (value) => value.value);
			expect(_neverData).to.deep.equal([]);
		});
	});
	describe('base interactions', function () {
		it('verify if value is array', function () {
			expect(A.is([1, 2, 3])).to.be.eq(true);
			expect(A.is(1)).to.be.eq(false);
		});
		it('verify if value isNot array', function () {
			expect(A.isNot([1, 2, 3])).to.be.eq(false);
			expect(A.isNot(1)).to.be.eq(true);
		});
		it('verify if value is empty array', function () {
			expect(A.isEmpty([1, 2, 3])).to.be.eq(false);
			expect(A.isEmpty([])).to.be.eq(true);
		});
		it('verify if value is non-empty array', function () {
			expect(A.isNotEmpty([1, 2, 3])).to.be.eq(true);
			expect(A.isNotEmpty([])).to.be.eq(false);
		});
		it('should assert if value is array', function () {
			expect(() => A.assert([1, 2, 3])).to.not.throw();
			expect(() => A.assert(1)).to.throw('Invalid value: expected an Array, got 1 [number]');
		});
		it('should assertNot if value is array', function () {
			expect(() => A.assertNot([1, 2, 3])).to.throw('Invalid value: expected not an Array, got [1,2,3] [object]');
			expect(() => A.assertNot(1)).to.not.throw();
		});
	});
});
