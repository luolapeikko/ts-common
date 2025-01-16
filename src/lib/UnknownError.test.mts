import {describe, expect, it} from 'vitest';
import {UnknownError} from './UnknownError.mjs';

describe('UnknownError', function () {
	it('should build UnknownError', function () {
		expect(new UnknownError('unknown message').message).to.equal('Unknown error: "unknown message"');
		expect(new UnknownError(new Error('unknown message')).message).to.equal('Unknown error: "unknown message"');
		expect(new UnknownError({message: 'unknown message'}).message).to.equal('Unknown error: "unknown message"');
		expect(new UnknownError(null).message).to.equal('Unknown error: null');
	});
});
