import {describe, expect, it} from 'vitest';
import {assertError, errorAs, errorWith, toError} from './errorUtils.mjs';
import {UnknownError} from './UnknownError.mjs';

describe('errorUtils', function () {
	describe('toError', function () {
		it('should build UnknownError', function () {
			expect(toError('unknown message').message).to.equal('unknown message');
			expect(toError(new Error('unknown message')).message).to.equal('unknown message');
			expect(toError(null).message).to.equal('Unknown error: null');
		});
	});
	describe('toError', function () {
		it('should assert error', function () {
			expect(() => assertError(null)).to.throw('Unknown error: null');
			expect(() => assertError(new Error('unknown message'))).not.to.throw();
		});
	});
	describe('errorAs', function () {
		it('should wrap error', function () {
			const test = new Error('test');
			expect(errorAs(test, TypeError).message).to.equal(test.message);
			expect(errorAs(test, TypeError).stack).to.equal(test.stack);
			expect(errorAs(test, TypeError).name).to.equal('TypeError');
			expect(errorAs(test, UnknownError).name).to.equal('UnknownError');
		});
		it('should copy error cause', function () {
			const errorCause = new Error('cause');
			const test = new Error('test');
			(test as any).cause = errorCause;
			const out = errorAs(test, UnknownError);
			expect(out.name).to.equal('UnknownError');
			expect((out as any).cause).to.equal(errorCause);
		});
	});
	describe('errorWith', function () {
		it('should wrap error', function () {
			const test = new Error('test');
			expect(errorWith(test, TypeError).message).to.equal(test.message);
			expect(errorWith(test, TypeError).stack).to.equal(test.stack);
			expect(errorWith(test, TypeError).name).to.equal('TypeError');
			expect(errorWith(test, (msg) => new UnknownError(msg)).name).to.equal('UnknownError');
		});
		it('should copy error cause', function () {
			const errorCause = new Error('cause');
			const test = new Error('test');
			(test as any).cause = errorCause;
			const out = errorWith(test, (msg) => new UnknownError(msg));
			expect(out.name).to.equal('UnknownError');
			expect((out as any).cause).to.equal(errorCause);
		});
	});
});
