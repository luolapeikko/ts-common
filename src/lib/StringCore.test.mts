import {describe, expect, it} from 'vitest';
import {StringCore as S} from './StringCore.mjs';

describe('Test StringCore functions', function () {
	it('is', function () {
		const value = 'test' as string | undefined;
		if (!S.is(value)) {
			throw new Error('value should be string');
		}
		expect(value).toBe('test');
	});
	it('isNot', function () {
		const value = 'test' as string | undefined;
		if (S.isNot(value)) {
			throw new Error('value should not be string');
		}
		expect(value).toBe('test');
	});
	it('isEmpty', function () {
		const value = '' as string | undefined;
		if (!S.isEmpty(value)) {
			throw new Error('value should not be empty string');
		}
		expect(value).toBe('');
	});
	it('isNotEmpty', function () {
		const value = 'test' as '' | 'test' | undefined;
		if (!S.isNotEmpty(value)) {
			throw new Error('value should be string');
		}
		expect(value).toBe('test');
	});
	it('startsWith', function () {
		const value = 'test' as string | undefined;
		if (!S.startsWith(value, 'te')) {
			throw new Error('value should start with "te"');
		}
		expect(value).toBe('test');
	});
	it('endsWith', function () {
		const value = 'test' as string | undefined;
		if (!S.endsWith(value, 'st')) {
			throw new Error('value should end with "st"');
		}
		expect(value).toBe('test');
	});
	it('isLowerCase', function () {
		const value = 'test' as string | undefined;
		if (!S.isLowerCase(value)) {
			throw new Error('value should be lowercase');
		}
		expect(value).toBe('test');
	});
	it('isUpperCase', function () {
		const value = 'TEST' as string | undefined;
		if (!S.isUpperCase(value)) {
			throw new Error('value should be uppercase');
		}
		expect(value).toBe('TEST');
	});
	it('isNumeric', function () {
		expect(S.isNumeric('123')).toBe(true);
		expect(S.isNumeric('123.5')).toBe(true);
		expect(S.isNumeric('abc')).toBe(false);
		expect(S.isNumeric('123abc')).toBe(false);
		expect(S.isNumeric('')).toBe(false);
		expect(S.isNumeric(' ')).toBe(false);
		expect(S.isNumeric(123)).toBe(false);
	});
	it('isNotNumeric', function () {
		expect(S.isNotNumeric('abc')).toBe(true);
		expect(S.isNotNumeric('123')).toBe(false);
		expect(S.isNotNumeric('123.5')).toBe(false);
		expect(S.isNotNumeric('123abc')).toBe(true);
		expect(S.isNotNumeric('')).toBe(true);
		expect(S.isNotNumeric(' ')).toBe(true);
		expect(S.isNotNumeric(123)).toBe(true);
	});
	it('assert', function () {
		expect(() => S.assert('test')).not.toThrow();
		expect(() => S.assert(123)).toThrow('Invalid value: expected a String, got 123 [number]');
		expect(() => S.assert(123n)).toThrow('Invalid value: expected a String, got 123 [bigint]');
		expect(() => S.assert(false)).toThrow('Invalid value: expected a String, got false [boolean]');
		expect(() => S.assert(() => {})).toThrow('Invalid value: expected a String, got [function]');
		expect(() => S.assert(Symbol())).toThrow('Invalid value: expected a String, got [symbol]');
		expect(() => S.assertNot('test')).toThrow('Invalid value: expected not a String, got "test" [string]');
		expect(() => S.assertNot(123)).not.toThrow();
	});
	it('getArticle', function () {
		expect(S.getArticle('test')).to.be.eq('a');
		expect(S.getArticle('honest')).to.be.eq('an');
		expect(S.getArticle('user')).to.be.eq('a');
		expect(S.getArticle('auto')).to.be.eq('an');
	});
});
