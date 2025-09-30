import {describe, expect, it} from 'vitest';
import {isAsyncIterable, isNotAsyncIterable} from './AsyncIterCore.mjs';

describe('AsyncIterCore', function () {
	describe('isAsyncIterable', function () {
		it('should return true for async iterable objects', function () {
			expect(isAsyncIterable((async function* () {})())).to.equal(true);
		});
		it('should return false for non-async iterable objects', function () {
			expect(isAsyncIterable([])).to.equal(false);
			expect(isAsyncIterable(new Set([]))).to.equal(false);
			expect(isAsyncIterable(new Map())).to.equal(false);
		});
	});
	describe('isNotAsyncIterable', function () {
		it('should return false for async iterable objects', function () {
			expect(isNotAsyncIterable((async function* () {})())).to.equal(false);
		});
		it('should return true for non-async iterable objects', function () {
			expect(isNotAsyncIterable([])).to.equal(true);
			expect(isNotAsyncIterable(new Set([]))).to.equal(true);
			expect(isNotAsyncIterable(new Map())).to.equal(true);
		});
	});
});
