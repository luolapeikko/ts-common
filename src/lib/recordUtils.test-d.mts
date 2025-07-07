import {assertType, describe, it} from 'vitest';
import {isRecord, isNotRecord} from './recordUtils.mjs';

const propertySymbol = Symbol('test');

describe('object Key filtering', function () {
	describe('isRecord Types', function () {
		it('should assert valid isRecord types', function () {
			const test = {bar: 1, foo: 'foo', [propertySymbol]: true} as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			if (isRecord(test)) {
				assertType<Record<string, unknown>>(test);
			}
		});
	});
	describe('isNotRecord Types', function () {
		it('should assert valid isNotRecord types', function () {
			const test = null as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			if (isNotRecord(test)) {
				assertType<null>(test);
			}
		});
	});
});
