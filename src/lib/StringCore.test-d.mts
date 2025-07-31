import {assertType, describe, it} from 'vitest';
import {type EmptyString, type NonEmptyString, type NumberString, type PrefixedString, type SuffixedString} from '../types/String.mjs';
import {StringCore as S} from './StringCore.mjs';

describe('Test StringCore functions', function () {
	describe('Type tests', function () {
		it('it should assert valid types', function () {
			assertType<EmptyString>('');
			assertType<NonEmptyString<'test'>>('test');
			assertType<PrefixedString<'te'>>('test');
			assertType<SuffixedString<'st'>>('test');
			assertType<Lowercase<string>>('test');
			assertType<Uppercase<string>>('TEST');
			assertType<NumberString>('123');
		});
		it('should give error for invalid types', function () {
			// @ts-expect-error Argument of type '"test"' is not assignable to parameter of type '""'.
			assertType<EmptyString>('test');
			// @ts-expect-error Argument of type '""' is not assignable to parameter of type never.
			assertType<NonEmptyString<number>>('');
			// @ts-expect-error Argument of type '""' is not assignable to parameter of type '"test"'.
			assertType<NonEmptyString<'test'>>('');
			// @ts-expect-error Argument of type '""' is not assignable to parameter of type '"test"'.
			assertType<NonEmptyString<number | 'test'>>('');
			// @ts-expect-error Argument of type '""' is not assignable to parameter of type '`te${string}`'.
			assertType<PrefixedString<'te'>>('');
			// @ts-expect-error Argument of type '""' is not assignable to parameter of type '`${string}st`'.
			assertType<SuffixedString<'st'>>('');
			// @ts-expect-error Argument of type 'TEST' is not assignable to parameter of type 'Lowercase<string>'.
			assertType<Lowercase<string>>('TEST');
			// @ts-expect-error Argument of type 'test' is not assignable to parameter of type 'Uppercase<string>'.
			assertType<Uppercase<string>>('test');
			// @ts-expect-error Argument of type '"abc"' is not assignable to parameter of type '`${number}`'.
			assertType<NumberString>('abc');
		});
	});
	describe('Function tests', function () {
		it('is', function () {
			const value = 'test' as string | undefined;
			if (!S.is(value)) {
				throw new Error('value should be string');
			}
			assertType<string>(value);
		});
		it('isNot', function () {
			const value = 'test' as string | undefined;
			if (!S.isNot(value)) {
				throw new Error('value should not be string');
			}
			assertType<undefined>(value);
		});
		it('isEmpty', function () {
			const value = 'test' as string | undefined;
			if (!S.isEmpty(value)) {
				throw new Error('value should not be empty string');
			}
			assertType<EmptyString>(value);
		});
		it('isNotEmpty', function () {
			const value = 'test' as '' | 'test' | undefined;
			if (!S.isNotEmpty(value)) {
				throw new Error('value should be string');
			}
			assertType<NonEmptyString<'test'>>(value);
		});
		it('startsWith', function () {
			const value = 'test' as string | undefined;
			if (!S.startsWith(value, 'te')) {
				throw new Error('value should start with "te"');
			}
			assertType<PrefixedString<'te'>>(value);
		});
		it('endsWith', function () {
			const value = 'test' as string | undefined;
			if (!S.endsWith(value, 'st')) {
				throw new Error('value should end with "st"');
			}
			assertType<SuffixedString<'st'>>(value);
		});
		it('isLowerCase', function () {
			const value = 'test' as string | undefined;
			if (!S.isLowerCase(value)) {
				throw new Error('value should be lowercase');
			}
			assertType<Lowercase<string>>(value);
		});
		it('isUpperCase', function () {
			const value = 'TEST' as string | undefined;
			if (!S.isUpperCase(value)) {
				throw new Error('value should be uppercase');
			}
			assertType<Uppercase<string>>(value);
		});
		it('isNumeric', function () {
			const value = '123' as string | undefined;
			if (!S.isNumeric(value)) {
				throw new Error('value should be numeric string');
			}
			assertType<NumberString>(value);
		});
	});
});
