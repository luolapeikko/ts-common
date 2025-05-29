import {describe, expect, it} from 'vitest';
import {type Nullable} from '../types/Nullable.mjs';
import {isNotNull, isNull} from './Nullable.mjs';

describe('Test Nullable functions', function () {
	it('isNotNull', function () {
		const value = 'test' as Nullable<string>;
		if (!isNotNull(value)) {
			throw new Error('value should not be null');
		}
		expect(value).to.equal('test');
	});
	it('isNull', function () {
		const value = 'test' as Nullable<string>;
		if (isNull(value)) {
			throw new Error('value should not be null');
		}
		expect(value).to.equal('test');
	});
});
