import {describe, expect, it} from 'vitest';
import {IterCore as I} from './IterCore.mjs';

describe('iterableUtils', function () {
	describe('isIterable', function () {
		it('should return true for iterable objects', function () {
			expect(I.isIterable([])).to.equal(true);
			expect(I.isIterable(new Set([]))).to.equal(true);
			expect(I.isIterable(new Map())).to.equal(true);
		});
		it('should return false for non-iterable objects', function () {
			expect(I.isIterable(undefined)).to.equal(false);
			expect(I.isIterable(null)).to.equal(false);
			expect(I.isIterable(42)).to.equal(false);
			expect(I.isIterable({})).to.equal(false);
		});
	});
	describe('assertIterable', function () {
		it('should throw for non-iterable objects', function () {
			expect(() => I.assertIterable(undefined)).to.throw('Invalid Iterable: undefined');
			expect(() => I.assertIterable(null)).to.throw('Invalid Iterable: null');
			expect(() => I.assertIterable(42)).to.throw('Invalid Iterable: 42');
			expect(() => I.assertIterable({})).to.throw('Invalid Iterable: {}');
		});
		it('should not throw for iterable objects', function () {
			expect(() => I.assertIterable([])).not.to.throw();
			expect(() => I.assertIterable(new Set([]))).not.to.throw();
			expect(() => I.assertIterable(new Map())).not.to.throw();
		});
	});
	describe('isNonIterable', function () {
		it('should return false for iterable objects', function () {
			expect(I.isNotIterable([])).to.equal(false);
			expect(I.isNotIterable(new Set([]))).to.equal(false);
			expect(I.isNotIterable(new Map())).to.equal(false);
		});
		it('should return true for non-iterable objects', function () {
			expect(I.isNotIterable(undefined)).to.equal(true);
			expect(I.isNotIterable(null)).to.equal(true);
			expect(I.isNotIterable(42)).to.equal(true);
			expect(I.isNotIterable({})).to.equal(true);
		});
	});
	describe('isAsyncIterable', function () {
		it('should return true for async iterable objects', function () {
			expect(I.isAsyncIterable((async function* () {})())).to.equal(true);
		});
		it('should return false for non-async iterable objects', function () {
			expect(I.isAsyncIterable([])).to.equal(false);
			expect(I.isAsyncIterable(new Set([]))).to.equal(false);
			expect(I.isAsyncIterable(new Map())).to.equal(false);
		});
	});
	describe('isNotAsyncIterable', function () {
		it('should return false for async iterable objects', function () {
			expect(I.isNotAsyncIterable((async function* () {})())).to.equal(false);
		});
		it('should return true for non-async iterable objects', function () {
			expect(I.isNotAsyncIterable([])).to.equal(true);
			expect(I.isNotAsyncIterable(new Set([]))).to.equal(true);
			expect(I.isNotAsyncIterable(new Map())).to.equal(true);
		});
	});
	describe('assertAsyncIterable', function () {
		it('should throw for non-async iterable objects', function () {
			expect(() => I.assertAsyncIterable([])).to.throw('Invalid AsyncIterable: []');
			expect(() => I.assertAsyncIterable(new Set([]))).to.throw('Invalid AsyncIterable: {}');
			expect(() => I.assertAsyncIterable(new Map())).to.throw('Invalid AsyncIterable: {}');
		});
		it('should not throw for async iterable objects', function () {
			expect(() => I.assertAsyncIterable((async function* () {})())).not.to.throw();
		});
	});
});
