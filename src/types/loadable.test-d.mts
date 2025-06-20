import {assertType, describe, it} from 'vitest';
import type {Loadable, ResolvedLoadable} from './Loadable.mjs';

const validLoadableValue = 'value';
const validLoadablePromise = Promise.resolve('value');
const validLoadableCallback = (): string => 'value';
const validLoadableCallbackPromise = (): Promise<string> => Promise.resolve('value');

const validResolvedLoadableValue = 'value';
const validResolvedLoadablePromise = Promise.resolve('value');

describe('loadable utils', function () {
	describe('Loadable', function () {
		it('should assert valid generics', function () {
			assertType<Loadable<string>>(validLoadableValue);
			assertType<Loadable<string>>(validLoadablePromise);
			assertType<Loadable<string>>(validLoadableCallback);
			assertType<Loadable<string>>(validLoadableCallbackPromise);
		});
	});
	describe('ResolvedLoadable', function () {
		it('should assert valid generics', function () {
			assertType<ResolvedLoadable<string>>(validResolvedLoadableValue);
			assertType<ResolvedLoadable<string>>(validResolvedLoadablePromise);
		});
	});
});
