import {describe, expect, it} from 'vitest';
import {UndefPredicate as U} from './UndefPredicate.mjs';

const list = [1, 'example', null, undefined] as const;

describe('Test UndefPredicate functions', function () {
	it('isNull', function () {
		expect(list.filter(U.isNull())).toStrictEqual([null]);
	});
	it('isNotNull', function () {
		expect(list.filter(U.isNotNull())).toStrictEqual([1, 'example', undefined]);
	});
	it('isUndefined', function () {
		expect(list.filter(U.isUndefined())).toStrictEqual([undefined]);
	});
	it('isNotUndefined', function () {
		expect(list.filter(U.isNotUndefined())).toStrictEqual([1, 'example', null]);
	});
	it('isNullish', function () {
		expect(list.filter(U.isNullish())).toStrictEqual([null, undefined]);
	});
	it('isNotNullish', function () {
		expect(list.filter(U.isNotNullish())).toStrictEqual([1, 'example']);
	});
});
