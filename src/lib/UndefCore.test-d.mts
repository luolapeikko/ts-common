import {assertType, describe, it} from 'vitest';
import {type Undef} from '../types/Undef.mjs';
import {UndefCore as U} from './UndefCore.mjs';

describe('Test NullCore functions', function () {
	describe('Test Undefined functions', function () {
		it('isNotUndefined', function () {
			const value = 'test' as Undef<string>;
			if (!U.isNotUndefined(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
		it('isUndefined', function () {
			const value = 'test' as Undef<string>;
			if (U.isUndefined(value)) {
				throw new Error('value should not be undefined');
			}
			assertType<string>(value);
		});
	});
});
