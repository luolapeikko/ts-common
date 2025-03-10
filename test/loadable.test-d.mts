import {assertType, describe, it} from 'vitest';
import type {Loadable, ResolvedLoadable} from '../src/index.mjs';

const validLoadableValue = 'value';
const validLoadablePromise = Promise.resolve('value');
const validLoadableCallback = () => 'value';
const validLoadableCallbackPromise = () => Promise.resolve('value');

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
