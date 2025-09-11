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
		expect(S.isNotEmpty<'' | 'test' | undefined>('')).toBe(false);
		expect(S.isNotEmpty<'' | 'test' | undefined>('test')).toBe(true);
		expect(S.isNotEmpty<'' | 'test' | undefined>(undefined)).toBe(false);
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
		expect(S.isNumeric<`${number}` | null>(' ')).toBe(false);
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
	it('isLowerCase', function () {
		expect(S.isLowerCase('test')).toBe(true);
		expect(S.isLowerCase('test123')).toBe(true);
		expect(S.isLowerCase('test!@#')).toBe(true);
		expect(S.isLowerCase(' ')).toBe(true);
		expect(S.isLowerCase('TEST')).toBe(false);
		expect(S.isLowerCase('Test')).toBe(false);
		expect(S.isLowerCase('')).toBe(false);
		expect(S.isLowerCase(123)).toBe(false);
	});
	it('isNotLowerCase', function () {
		expect(S.isNotLowerCase('test')).toBe(false);
		expect(S.isNotLowerCase('test123')).toBe(false);
		expect(S.isNotLowerCase('test!@#')).toBe(false);
		expect(S.isNotLowerCase(' ')).toBe(false);
		expect(S.isNotLowerCase('TEST')).toBe(true);
		expect(S.isNotLowerCase('Test')).toBe(true);
		expect(S.isNotLowerCase('')).toBe(true);
		expect(S.isNotLowerCase(123)).toBe(true);
	});
	it('isUpperCase', function () {
		expect(S.isUpperCase('TEST')).toBe(true);
		expect(S.isUpperCase('TEST123')).toBe(true);
		expect(S.isUpperCase('TEST!@#')).toBe(true);
		expect(S.isUpperCase(' ')).toBe(true);
		expect(S.isUpperCase('test')).toBe(false);
		expect(S.isUpperCase('Test')).toBe(false);
		expect(S.isUpperCase('')).toBe(false);
		expect(S.isUpperCase(123)).toBe(false);
	});
	it('isNotUpperCase', function () {
		expect(S.isNotUpperCase('TEST')).toBe(false);
		expect(S.isNotUpperCase('TEST123')).toBe(false);
		expect(S.isNotUpperCase('TEST!@#')).toBe(false);
		expect(S.isNotUpperCase(' ')).toBe(false);
		expect(S.isNotUpperCase('test')).toBe(true);
		expect(S.isNotUpperCase('Test')).toBe(true);
		expect(S.isNotUpperCase('')).toBe(true);
		expect(S.isNotUpperCase(123)).toBe(true);
	});
	it('assert not throw', function () {
		expect(() => S.assert('test')).not.toThrow();
		expect(() => S.assertNot(123)).not.toThrow();
		expect(() => S.assertEmpty('')).not.toThrow();
		expect(() => S.assertNotEmpty('test')).not.toThrow();
		expect(() => S.assertLowerCase('test')).not.toThrow();
		expect(() => S.assertNotLowerCase('TEST')).not.toThrow();
		expect(() => S.assertUpperCase('TEST')).not.toThrow();
		expect(() => S.assertNotUpperCase('test')).not.toThrow();
		expect(() => S.assertNumeric('123')).not.toThrow();
		expect(() => S.assertNumeric('123.5')).not.toThrow();
		expect(() => S.assertNotNumeric('abc')).not.toThrow();
	});
	it('assert throw', function () {
		// base error type tests
		expect(() => S.assert(undefined)).toThrow('Invalid String value: undefined');
		expect(() => S.assert(null)).toThrow('Invalid String value: null');
		expect(() => S.assert(123)).toThrow('Invalid String value: 123 [Number]');
		expect(() => S.assert(123n)).toThrow('Invalid String value: 123 [BigInt]');
		expect(() => S.assert(false)).toThrow('Invalid String value: false [Boolean]');
		expect(() => S.assert(() => {})).toThrow('Invalid String value: [Function]');
		expect(() => S.assert(Symbol())).toThrow('Invalid String value: [Symbol]');
		// tests
		expect(() => S.assert(123)).toThrow('Invalid String value: 123 [Number]');
		expect(() => S.assertNot('test')).toThrow('Invalid NonString value: "test"');
		expect(() => S.assertEmpty('test')).toThrow('Invalid EmptyString value: "test"');
		expect(() => S.assertNotEmpty('')).toThrow('Invalid NonEmptyString value: ""');
		expect(() => S.assertLowerCase('TEST')).toThrow('Invalid LowerCaseString value: "TEST"');
		expect(() => S.assertNotLowerCase('test')).toThrow('Invalid NonLowerCaseString value: "test"');
		expect(() => S.assertUpperCase('test')).toThrow('Invalid UpperCaseString value: "test"');
		expect(() => S.assertNotUpperCase('TEST')).toThrow('Invalid NonUpperCaseString value: "TEST"');
		expect(() => S.assertNumeric('abc')).toThrow('Invalid NumberString value: "abc"');
		expect(() => S.assertNotNumeric('123')).toThrow('Invalid NonNumberString value: "123"');
	});
	it('from', function () {
		expect(S.from('test')).toBe('test');
		expect(S.emptyFrom('')).toBe('');
		expect(S.lowerCaseFrom('test')).toBe('test');
		expect(S.upperCaseFrom('TEST')).toBe('TEST');
		expect(S.numericFrom('123')).toBe('123');
	});
	it('from throw', function () {
		expect(() => S.from(undefined)).toThrow('Invalid String value: undefined');
		expect(() => S.emptyFrom('test')).toThrow('Invalid EmptyString value: "test"');
		expect(() => S.lowerCaseFrom('TEST')).toThrow('Invalid LowerCaseString value: "TEST"');
		expect(() => S.upperCaseFrom('test')).toThrow('Invalid UpperCaseString value: "test"');
		expect(() => S.numericFrom('test')).toThrow('Invalid NumberString value: "test"');
	});
});
