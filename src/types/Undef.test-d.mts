import {assertType, describe, it} from 'vitest';
import {isNotUndef, isUndef} from '../lib/UndefCore.mjs';
import {type Undef} from './Undef.mjs';

describe('Test undefined type guards', function () {
	describe('Test Nullish type', function () {
		it('should assert valid types', function () {
			assertType<Undef<string>>(undefined);
			assertType<Undef<string>>('test');
		});
		it('should assert invalid types', function () {
			// @ts-expect-error Argument of type 'null' is not assignable to parameter of type 'Undef<string>'
			assertType<Undef<string>>(null);
			// @ts-expect-error Argument of type '1' is not assignable to parameter of type 'Nullish<string>'
			assertType<Nullish<string>>(1);
		});
	});
	describe('Test undefined type guards', function () {
		it('isNotNull', function () {
			const value = 'test' as Undef<string>;
			if (!isNotUndef(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
		it('isNull', function () {
			const value = 'test' as Undef<string>;
			if (isUndef(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
	});
});
