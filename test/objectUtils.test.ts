/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import {arrayMap, objectEntries, objectKeys, objectValues} from '../src/';
import {type NonEmptyArray, type NonEmptyReadonlyArray} from '../src';

const constDataObject = {
	key: 'value',
} as const;

const baseDataObject: Record<string, string> = {
	key: 'value',
};

const neverDataObject = {} as const;

const mapTest = {
	key: {
		value: 'value',
	},
} as const;

describe('objectUtils', function () {
	describe('objectKeys', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyReadonlyArray<'key'> = objectKeys(constDataObject);
			const _baseData: NonEmptyReadonlyArray<string> = objectKeys(baseDataObject);
			const _neverData: Array<string> = objectKeys(neverDataObject);
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
			const _baseData: NonEmptyArray<[string, string]> = objectEntries(baseDataObject);
			const _neverData: Array<[never, never]> = objectEntries(neverDataObject);
		});
	});
	describe('objectEntries with map', function () {
		it('should map valid types', function () {
			const _constValue: NonEmptyReadonlyArray<'value'> = arrayMap(objectEntries(mapTest), ([_key, value]) => value.value);
			const _constKey: NonEmptyArray<'key'> = arrayMap(objectEntries(mapTest), ([key, _value]) => key);
		});
	});
});
