import {describe, expect, it} from 'vitest';
import {IterCore as I} from './IterCore.mjs';

describe('iterableUtils', function () {
	describe('isIterable', function () {
		it('should return true for iterable objects', function () {
			expect(I.is([])).to.equal(true);
			expect(I.is(new Set([]))).to.equal(true);
			expect(I.is(new Map())).to.equal(true);
		});
		it('should return false for non-iterable objects', function () {
			expect(I.is(undefined)).to.equal(false);
			expect(I.is(null)).to.equal(false);
			expect(I.is(42)).to.equal(false);
			expect(I.is({})).to.equal(false);
		});
	});
	describe('assertIterable', function () {
		it('should throw for non-iterable objects', function () {
			expect(() => I.assert(undefined)).to.throw('Invalid Iterable value: undefined');
			expect(() => I.assert(null)).to.throw('Invalid Iterable value: null');
			expect(() => I.assert(42)).to.throw('Invalid Iterable value: 42');
			expect(() => I.assert({})).to.throw('Invalid Iterable value: {}');
		});
		it('should not throw for iterable objects', function () {
			expect(() => I.assert([])).not.to.throw();
			expect(() => I.assert(new Set([]))).not.to.throw();
			expect(() => I.assert(new Map())).not.to.throw();
		});
	});
	describe('isNonIterable', function () {
		it('should return false for iterable objects', function () {
			expect(I.isNot([])).to.equal(false);
			expect(I.isNot(new Set([]))).to.equal(false);
			expect(I.isNot(new Map())).to.equal(false);
		});
		it('should return true for non-iterable objects', function () {
			expect(I.isNot(undefined)).to.equal(true);
			expect(I.isNot(null)).to.equal(true);
			expect(I.isNot(42)).to.equal(true);
			expect(I.isNot({})).to.equal(true);
		});
	});
	describe('isAsyncIterable', function () {
		it('should return true for async iterable objects', function () {
			expect(I.isAsync((async function* () {})())).to.equal(true);
		});
		it('should return false for non-async iterable objects', function () {
			expect(I.isAsync([])).to.equal(false);
			expect(I.isAsync(new Set([]))).to.equal(false);
			expect(I.isAsync(new Map())).to.equal(false);
		});
	});
	describe('isNotAsyncIterable', function () {
		it('should return false for async iterable objects', function () {
			expect(I.isNotAsync((async function* () {})())).to.equal(false);
		});
		it('should return true for non-async iterable objects', function () {
			expect(I.isNotAsync([])).to.equal(true);
			expect(I.isNotAsync(new Set([]))).to.equal(true);
			expect(I.isNotAsync(new Map())).to.equal(true);
		});
	});
	describe('assertAsyncIterable', function () {
		it('should throw for non-async iterable objects', function () {
			expect(() => I.assertAsync([])).to.throw('Invalid AsyncIterable value: []');
			expect(() => I.assertAsync(new Set([]))).to.throw('Invalid AsyncIterable value: {}');
			expect(() => I.assertAsync(new Map())).to.throw('Invalid AsyncIterable value: {}');
		});
		it('should not throw for async iterable objects', function () {
			expect(() => I.assertAsync((async function* () {})())).not.to.throw();
		});
	});
});
