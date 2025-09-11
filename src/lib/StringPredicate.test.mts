import {describe, expect, it} from 'vitest';
import {StringPredicate as S} from './StringPredicate.mjs';

describe('Test StringPredicate functions', function () {
	it('is', function () {
		const list = [1, 'example', null, undefined] as const;
		expect(list.filter(S.is())).toStrictEqual(['example']);
	});
	it('isNot', function () {
		const list = [1, 'example', null, undefined] as const;
		expect(list.filter(S.isNot())).toStrictEqual([1, null, undefined]);
	});
	it('isEmpty', function () {
		const list = [1, 'example', '', null, undefined] as const;
		expect(list.filter(S.isEmpty())).toStrictEqual(['']);
	});
	it('isNotEmpty', function () {
		const list = [1, 'example', '', null, undefined] as const;
		expect(list.filter(S.isNotEmpty())).toStrictEqual(['example']);
	});
	it('startsWith', function () {
		const list = [1, 'example', '', null, undefined] as const;
		expect(list.filter(S.startsWith('ex'))).toStrictEqual(['example']);
	});
	it('endsWith', function () {
		const list = [1, 'example', '', null, undefined] as const;
		expect(list.filter(S.endsWith('le'))).toStrictEqual(['example']);
	});
	it('isLowerCase', function () {
		const list = ['test', 'Example', ''] as const;
		expect(list.filter(S.isLowerCase())).toStrictEqual(['test']);
	});
	it('isUpperCase', function () {
		const list = ['TEST', 'Example', ''] as const;
		expect(list.filter(S.isUpperCase())).toStrictEqual(['TEST']);
	});
	it('isNumeric', function () {
		const list = ['123', '123.5', 'abc', '123abc', ''] as const;
		expect(list.filter(S.isNumeric())).toStrictEqual(['123', '123.5']);
	});
	it('isNotNumeric', function () {
		const list = ['123', '123.5', 'abc', '123abc', ''] as const;
		expect(list.filter(S.isNotNumeric())).toStrictEqual(['abc', '123abc', '']);
	});
	it('isLowerCase', function () {
		const list = ['123', '123.5', 'abc', '123abc', ''] as const;
		expect(list.filter(S.isLowerCase())).toStrictEqual(['123', '123.5', 'abc', '123abc']);
	});
	it('isNotLowerCase', function () {
		const list = ['123', '123.5', 'ABC', '123ABC', ''] as const;
		expect(list.filter(S.isNotLowerCase())).toStrictEqual(['ABC', '123ABC', '']);
	});
	it('isUpperCase', function () {
		const list = ['123', '123.5', 'ABC', '123ABC', ''] as const;
		expect(list.filter(S.isUpperCase())).toStrictEqual(['123', '123.5', 'ABC', '123ABC']);
	});
	it('isNotUpperCase', function () {
		const list = ['123', '123.5', 'abc', '123abc', ''] as const;
		expect(list.filter(S.isNotUpperCase())).toStrictEqual(['abc', '123abc', '']);
	});
});
