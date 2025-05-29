import {assertType, describe, it} from 'vitest';
import {isNotNullish, isNullish} from '../lib/Nullish.mjs';
import {type Nullish} from './Nullish.mjs';

describe('Test Nullish types', function () {
	describe('Test Nullish type', function () {
		it('should assert valid types', function () {
			assertType<Nullish<string>>(undefined);
			assertType<Nullish<string>>(null);
			assertType<Nullish<string>>('test');
		});
		it('should assert invalid types', function () {
			// @ts-expect-error Argument of type '1' is not assignable to parameter of type 'Nullish<string>'
			assertType<Nullish<string>>(1);
		});
	});
	describe('Test Nullish type guards', function () {
		it('isNotNull', function () {
			const value = 'test' as Nullish<string>;
			if (!isNotNullish(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
		it('isNull', function () {
			const value = 'test' as Nullish<string>;
			if (isNullish(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
	});
});
