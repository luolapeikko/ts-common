import {describe, expect, it} from 'vitest';
import {assertError, toError} from './errorUtils.mjs';

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
});
