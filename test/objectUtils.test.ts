/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import {arrayMap, type NonEmptyArray, type NonEmptyReadonlyArray, objectEntries, objectKeys, objectValues} from '../src/';

const mapTest = {
	key: {
		value: 'value',
	},
} as const;

type MixedType = {
	readonly key: 'value';
	normal: 'value2';
};

const demo: MixedType = {
	key: 'value',
	normal: 'value2',
};

describe('objectUtils', function () {
	describe('objectKeys', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyReadonlyArray<'key'> = objectKeys({key: 'value'} as const);
			const _looseData: Array<'key'> = objectKeys({key: 'value'});
			const _baseData: Array<string> = objectKeys<Record<string, string>>({key: 'value'});
			const _mixedData: Array<'key' | 'normal'> = objectKeys(demo);
			const _neverData: [] = objectKeys({});
		});
	});
	describe('objectValues', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyReadonlyArray<'value'> = objectValues({key: 'value'} as const);
			const _looseData: Array<string> = objectValues({key: 'value'});
			const _baseData: Array<string> = objectValues<Record<string, string>>({key: 'value'});
			const _mixedData: Array<'value' | 'value2'> = objectValues(demo);
			const _neverData: [] = objectValues({});
		});
	});
	describe('objectEntries', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyReadonlyArray<['key', 'value']> = objectEntries({key: 'value'} as const);
			const _looseData: Array<['key', string]> = objectEntries({key: 'value'});
			const _baseData: Array<[string, string]> = objectEntries<Record<string, string>>({key: 'value'});
			const _mixedData: Array<['key' | 'normal', 'value' | 'value2']> = objectEntries(demo);
			const _neverData: [] = objectEntries({});
		});
	});
	describe('objectEntries with map', function () {
		it('should map valid types', function () {
			const entries = objectEntries(mapTest);
			const _constPickValue: NonEmptyArray<'value'> = arrayMap<'value', typeof entries>(entries, ([_key, value]) => value.value);
			const _constPickKey: NonEmptyArray<'key'> = arrayMap(entries, ([key, _value]) => key);
		});
	});
});
