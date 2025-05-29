import {assertType, describe, it} from 'vitest';
import {isNotNull, isNull} from '../lib/Nullable.mjs';
import {type Nullable} from './Nullable.mjs';

describe('Test Null types', function () {
	describe('Nullable', function () {
		it('should assert valid types', function () {
			assertType<Nullable<string>>(null);
			assertType<Nullable<string>>('test');
		});
		it('should assert invalid types', function () {
			// @ts-expect-error Argument of type 'undefined' is not assignable to parameter of type 'Nullable<string>'
			assertType<Nullable<string>>(undefined);
			// @ts-expect-error Argument of type '1' is not assignable to parameter of type 'Nullish<string>'
			assertType<Nullable<string>>(1);
		});
	});
	describe('null checks', function () {
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
});
