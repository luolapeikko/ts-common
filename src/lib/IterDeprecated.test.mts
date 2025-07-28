import {describe, expect, it} from 'vitest';
import {isAsyncIterable, isIterable, isNotAsyncIterable, isNotIterable} from './IterCore.mjs';

describe('iterableUtils', function () {
	describe('isIterable', function () {
		it('should return true for iterable objects', function () {
			expect(isIterable([])).to.equal(true);
			expect(isIterable(new Set([]))).to.equal(true);
			expect(isIterable(new Map())).to.equal(true);
		});
		it('should return false for non-iterable objects', function () {
			expect(isIterable(undefined)).to.equal(false);
			expect(isIterable(null)).to.equal(false);
			expect(isIterable(42)).to.equal(false);
			expect(isIterable({})).to.equal(false);
		});
	});
	describe('isNonIterable', function () {
		it('should return false for iterable objects', function () {
			expect(isNotIterable([])).to.equal(false);
			expect(isNotIterable(new Set([]))).to.equal(false);
			expect(isNotIterable(new Map())).to.equal(false);
		});
		it('should return true for non-iterable objects', function () {
			expect(isNotIterable(undefined)).to.equal(true);
			expect(isNotIterable(null)).to.equal(true);
			expect(isNotIterable(42)).to.equal(true);
			expect(isNotIterable({})).to.equal(true);
		});
	});
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
