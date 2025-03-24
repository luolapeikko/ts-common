import {assertType, describe, it} from 'vitest';
import {type Nullable, type Nullish} from './Null.mjs';

describe('Test Null types', function () {
	describe('Nullish', function () {
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
});
