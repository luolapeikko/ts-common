/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import {objectEntries, objectKeys, objectValues} from '../src/';
import {type NonEmptyArray} from '../src';

const constDataObject = {
	key: 'value',
} as const;

const baseDataObject = {
	key: 'value',
};

const neverDataObject = {};

describe('objectUtils', function () {
	describe('objectKeys', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyArray<'key'> = objectKeys(constDataObject);
			const _baseData: NonEmptyArray<'key'> = objectKeys(baseDataObject); // key is always "const"
			const _neverData: Array<never> = objectKeys(neverDataObject);
		});
	});
	describe('objectValues', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyArray<'value'> = objectValues(constDataObject);
			const _baseData: NonEmptyArray<string> = objectValues(baseDataObject);
			const _neverData: Array<never> = objectValues(neverDataObject);
		});
	});
	describe('objectEntries', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyArray<['key', 'value']> = objectEntries(constDataObject);
			const _baseData: NonEmptyArray<['key', string]> = objectEntries(baseDataObject);
			const _neverData: Array<[never, never]> = objectEntries(neverDataObject);
		});
	});
});
