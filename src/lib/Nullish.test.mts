import {describe, expect, it} from 'vitest';
import {type Nullish} from '../types/Nullish.mjs';
import {isNotNullish, isNullish} from './Nullish.mjs';

describe('Test Nullish functions', function () {
	it('isNotNullish', function () {
		const value = 'test' as Nullish<string>;
		if (!isNotNullish(value)) {
			throw new Error('value should not be undefined');
		}
		expect(value).to.equal('test');
	});
	it('isNullish', function () {
		const value = 'test' as Nullish<string>;
		if (isNullish(value)) {
			throw new Error('value should not be undefined');
		}
		expect(value).to.equal('test');
	});
});
