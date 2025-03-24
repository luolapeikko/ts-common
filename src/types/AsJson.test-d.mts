import {assertType, describe, it} from 'vitest';
import {type AsJson} from './AsJson.mjs';

const asJsonString = 'test';
const asJsonObject = {test: 'test'};
const asJsonFunction = {test: () => 'test'};
const asJsonUndefined = {test: undefined};
const asJsonNull = {test: null};

describe('Test AsJson', function () {
	it('should have valid AsJson types', function () {
		assertType<AsJson<string>>(asJsonString);
		assertType<AsJson<{test: string}>>(asJsonObject);
		assertType<AsJson<{test: undefined}>>(asJsonUndefined);
		assertType<AsJson<{test: null}>>(asJsonNull);
	});
	it('should not have valid AsJson types', function () {
		// @ts-expect-errorType '() => string' is not assignable to type 'never'.
		assertType<AsJson<{test: () => ''}>>(asJsonFunction);
	});
});
