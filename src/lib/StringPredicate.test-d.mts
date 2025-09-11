import {assertType, describe, it} from 'vitest';
import {type EmptyString, type NonEmptyString, type NumberString, type PrefixedString, type SuffixedString} from '../types/String.mjs';
import {StringPredicate as S} from './StringPredicate.mjs';

describe('Test StringPredicate functions', function () {
	describe('Type tests', function () {
		it('is', function () {
			assertType<string[]>(['test'].filter(S.is()));
		});
		it('isNot', function () {
			const data: (string | number)[] = ['test', 123];
			assertType<number[]>(data.filter(S.isNot()));
		});
		it('isEmpty', function () {
			assertType<EmptyString[]>(['', ''].filter(S.isEmpty()));
		});
		it('isNotEmpty', function () {
			assertType<NonEmptyString<'test'>[]>(['test' as const].filter(S.isNotEmpty()));
		});
		it('startsWith', function () {
			assertType<PrefixedString<'te'>[]>(['test' as const].filter(S.startsWith('te')));
		});
		it('endsWith', function () {
			assertType<SuffixedString<'st'>[]>(['test' as const].filter(S.endsWith('st')));
		});
		it('isLowerCase', function () {
			assertType<Lowercase<'test'>[]>(['test' as const].filter(S.isLowerCase()));
		});
		it('isUpperCase', function () {
			assertType<Uppercase<'TEST'>[]>(['TEST' as const].filter(S.isUpperCase()));
		});
		it('isNumeric', function () {
			assertType<NumberString[]>(['123' as const].filter(S.isNumeric()));
		});
		it('isNotNumeric', function () {
			const data: ('test' | NumberString)[] = ['test', '123'];
			assertType<'test'[]>(data.filter(S.isNotNumeric()));
		});
	});
	describe('Type fail tests', function () {
		it('isNot', function () {
			const data: (string | number)[] = ['test', 123];
			// @ts-expect-error Argument of type 'number[]' is not assignable to parameter of type 'string[]'.
			assertType<string[]>(data.filter(S.isNot()));
		});
		it('isEmpty', function () {
			const data = ['', ''] as const;
			// @ts-expect-error Argument of type '""[]' is not assignable to parameter of type 'never[]'.
			assertType<NonEmptyString<''>[]>(data.filter(S.isEmpty()));
		});
		it('isNotEmpty', function () {
			// @ts-expect-error Argument of type '"test"[]' is not assignable to parameter of type '""[]'.
			assertType<EmptyString[]>(['test' as const].filter(S.isNotEmpty()));
		});
		it('isNotNumeric', function () {
			const data: ('test' | NumberString)[] = ['test', '123'];
			// @ts-expect-error Argument of type '"test"[]' is not assignable to parameter of type '`${number}`[]'.
			assertType<NumberString[]>(data.filter(S.isNotNumeric()));
		});
	});
});
