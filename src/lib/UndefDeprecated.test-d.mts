import {assertType, describe, it} from 'vitest';
import {type Nullable} from '../types/Nullable.mjs';
import {type Nullish} from '../types/Nullish.mjs';
import {type Undef} from '../types/Undef.mjs';
import {isNotNull, isNotNullish, isNotUndef, isNull, isNullish, isUndef} from './UndefCore.mjs';

describe('Deprecated undef function', function () {
	describe('Test Undefined functions', function () {
		it('isNotUndefined', function () {
			const value = 'test' as Undef<string>;
			if (!isNotUndef(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
		it('isUndefined', function () {
			const value = 'test' as Undef<string>;
			if (isUndef(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
	});
	describe('Test Nullable functions', function () {
		it('isNotNull', function () {
			const value = 'test' as Nullable<string>;
			if (!isNotNull(value)) {
				throw new Error('value should not be null');
			}
			assertType<string>(value);
		});
		it('isNull', function () {
			const value = 'test' as Nullable<string>;
			if (isNull(value)) {
				throw new Error('value should not be null');
			}
			assertType<string>(value);
		});
	});
	describe('Test Nullish functions', function () {
		it('isNotNullish', function () {
			const value = 'test' as Nullish<string>;
			if (!isNotNullish(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
		it('isNullish', function () {
			const value = 'test' as Nullish<string>;
			if (isNullish(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
	});
});
