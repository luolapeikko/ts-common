import {assertType, describe, it} from 'vitest';
import {type Undef} from '../types/Undef.mjs';
import {isNotUndef, isUndef} from './Undef.mjs';

describe('Test Undefined functions', function () {
	it('isNotUndefined', function () {
		const value = 'test' as Undef<string>;
		if (!isNotUndef(value)) {
			throw new Error('value should not be undefined');
		}
		assertType<string>(value);
	});
	it('isUndefined', function () {
		const value = 'test' as Undef<string>;
		if (isUndef(value)) {
			throw new Error('value should not be undefined');
		}
		assertType<string>(value);
	});
});
