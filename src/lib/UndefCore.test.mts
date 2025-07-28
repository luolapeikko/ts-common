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
			expect(() => U.assertUndefined('test')).to.throw('Value is "test"');
			expect(() => U.assertUndefined(null)).to.throw('Value is null');
			expect(() => U.assertNotUndefined(undefined)).to.throw('Value is undefined');
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
			expect(() => U.assertNullish('test')).to.throw('Value is "test"');
			expect(() => U.assertNotNullish(null)).to.throw('Value is null');
			expect(() => U.assertNotNullish(undefined)).to.throw('Value is undefined');
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
			expect(() => U.assertNull('test')).to.throw('Value is "test"');
			expect(() => U.assertNull(undefined)).to.throw('Value is undefined');
			expect(() => U.assertNotNull(null)).to.throw('Value is null');
		});
	});
});
