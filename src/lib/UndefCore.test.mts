import {describe, expect, it} from 'vitest';
import {type Nullable} from '../types/Nullable.mjs';
import {type Nullish} from '../types/Nullish.mjs';
import {type Undef} from '../types/Undef.mjs';
import {UndefCore as U} from './UndefCore.mjs';

describe('Test UndefCore functions', function () {
	describe('Test Undef functions', function () {
		it('isNotUndefined', function () {
			const value = 'test' as Undef<string>;
			if (!U.isNotUndefined(value)) {
				throw new Error('value should not be undefined');
			}
			expect(value).to.equal('test');
		});
		it('isUndefined', function () {
			const value = 'test' as Undef<string>;
			if (U.isUndefined(value)) {
				throw new Error('value should not be undefined');
			}
			expect(value).to.equal('test');
		});
		it('assert', function () {
			expect(() => U.assertUndefined('test')).to.throw('Invalid value: expected an Undefined, got "test" [string]');
			expect(() => U.assertUndefined(null)).to.throw('Invalid value: expected an Undefined, got null [object]');
			expect(() => U.assertNotUndefined(undefined)).to.throw('Invalid value: expected not an Undefined, got [undefined]');
		});
	});
	describe('Test Nullish functions', function () {
		it('isNotNullish', function () {
			const value = 'test' as Nullish<string>;
			if (!U.isNotNullish(value)) {
				throw new Error('value should not be undefined');
			}
			expect(value).to.equal('test');
		});
		it('isNullish', function () {
			const value = 'test' as Nullish<string>;
			if (U.isNullish(value)) {
				throw new Error('value should not be undefined');
			}
			expect(value).to.equal('test');
		});
		it('assert', function () {
			expect(() => U.assertNullish('test')).to.throw('Invalid value: expected a Nullish, got "test" [string]');
			expect(() => U.assertNotNullish(null)).to.throw('Invalid value: expected not a Nullish, got null [object]');
			expect(() => U.assertNotNullish(undefined)).to.throw('Invalid value: expected not a Nullish, got [undefined]');
		});
	});
	describe('Test Nullable functions', function () {
		it('isNotNull', function () {
			const value = 'test' as Nullable<string>;
			if (!U.isNotNull(value)) {
				throw new Error('value should not be null');
			}
			expect(value).to.equal('test');
		});
		it('isNull', function () {
			const value = 'test' as Nullable<string>;
			if (U.isNull(value)) {
				throw new Error('value should not be null');
			}
			expect(value).to.equal('test');
		});
		it('assert', function () {
			expect(() => U.assertNull('test')).to.throw('Invalid value: expected a Null, got "test" [string]');
			expect(() => U.assertNull(undefined)).to.throw('Invalid value: expected a Null, got [undefined]');
			expect(() => U.assertNotNull(null)).to.throw('Invalid value: expected not a Null, got null [object]');
		});
	});
});
