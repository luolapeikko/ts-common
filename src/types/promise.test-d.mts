import {assertType, describe, it} from 'vitest';
import {type Awaitable} from './promise.mjs';

describe('Test Awaitable type', function () {
	describe('Test valid Awaitable types', function () {
		it('should assert valid types', function () {
			assertType<Awaitable<string>>('test');
			assertType<Awaitable<string>>(Promise.resolve('test'));
		});
		it('should assert invalid types', function () {
			// @ts-expect-error Argument of type 'undefined' is not assignable to parameter of type 'Awaitable<string>'
			assertType<Awaitable<string>>(undefined);
		});
	});
});
