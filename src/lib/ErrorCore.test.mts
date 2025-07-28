import {describe, expect, it} from 'vitest';
import {ErrorCore as E} from './ErrorCore.mjs';
import {UnknownError} from './UnknownError.mjs';

describe('errorUtils', function () {
	describe('toError', function () {
		it('should build UnknownError', function () {
			expect(E.from('unknown message').message).to.equal('unknown message');
			expect(E.from(new Error('unknown message')).message).to.equal('unknown message');
			expect(E.from(null).message).to.equal('Unknown error: null');
		});
	});
	describe('toError', function () {
		it('should assert error', function () {
			expect(() => E.assert(null)).to.throw('Unknown error: null');
			expect(() => E.assert(new Error('unknown message'))).not.to.throw();
		});
	});
	describe('is', function () {
		it('should validate error', function () {
			expect(E.is(null)).to.equal(false);
			expect(E.is(new Error('unknown message'))).to.equal(true);
		});
	});
	describe('errorAs', function () {
		it('should wrap error', function () {
			const test = new Error('test');
			expect(E.as(test, TypeError).message).to.equal(test.message);
			expect(E.as(test, TypeError).stack).to.equal(test.stack);
			expect(E.as(test, TypeError).name).to.equal('TypeError');
			expect(E.as(test, UnknownError).name).to.equal('UnknownError');
		});
		it('should copy error cause', function () {
			const errorCause = new Error('cause');
			const test = new Error('test');
			(test as any).cause = errorCause;
			const out = E.as(test, UnknownError);
			expect(out.name).to.equal('UnknownError');
			expect((out as any).cause).to.equal(errorCause);
		});
	});
	describe('errorWith', function () {
		it('should wrap error', function () {
			const test = new Error('test');
			expect(E.with(test, TypeError).message).to.equal(test.message);
			expect(E.with(test, TypeError).stack).to.equal(test.stack);
			expect(E.with(test, TypeError).name).to.equal('TypeError');
			expect(E.with(test, (msg) => new UnknownError(msg)).name).to.equal('UnknownError');
		});
		it('should copy error cause', function () {
			const errorCause = new Error('cause');
			const test = new Error('test');
			(test as any).cause = errorCause;
			const out = E.with(test, (msg) => new UnknownError(msg));
			expect(out.name).to.equal('UnknownError');
			expect((out as any).cause).to.equal(errorCause);
		});
	});
});
