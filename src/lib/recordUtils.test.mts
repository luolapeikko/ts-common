import {describe, expect, it} from 'vitest';
import {isRecord, isNotRecord} from './recordUtils.mjs';

const propertySymbol = Symbol('test');

describe('recordUtils', function () {
	describe('isRecord Types', function () {
		it('should assert valid isRecord types', function () {
			const test = {bar: 1, foo: 'foo', [propertySymbol]: true} as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			expect(isRecord(test)).to.be.eq(true);
		});
	});
	describe('isNotRecord Types', function () {
		it('should assert valid isNotRecord types', function () {
			const test = null as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			expect(isNotRecord(test)).to.be.eq(true);
		});
	});
});
