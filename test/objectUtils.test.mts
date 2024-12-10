/* eslint-disable sonarjs/no-duplicate-string */
import {arrayMap, type NonEmptyArray, type NonEmptyReadonlyArray, objectEntries, objectKeys, objectValues} from '../src/index.mjs';
import {describe, expect, it} from 'vitest';

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
			expect(_constData).to.deep.equal(['key']);
			const _looseData: Array<'key'> = objectKeys({key: 'value'});
			expect(_looseData).to.deep.equal(['key']);
			const _baseData: Array<string> = objectKeys<Record<string, string>>({key: 'value'});
			expect(_baseData).to.deep.equal(['key']);
			const _mixedData: Array<'key' | 'normal'> = objectKeys(demo);
			expect(_mixedData).to.deep.equal(['key', 'normal']);
			const _neverData: [] = objectKeys({});
			expect(_neverData).to.deep.equal([]);
		});
	});
	describe('objectValues', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyReadonlyArray<'value'> = objectValues({key: 'value'} as const);
			expect(_constData).to.deep.equal(['value']);
			const _looseData: Array<string> = objectValues({key: 'value'});
			expect(_looseData).to.deep.equal(['value']);
			const _baseData: Array<string> = objectValues<Record<string, string>>({key: 'value'});
			expect(_baseData).to.deep.equal(['value']);
			const _mixedData: Array<'value' | 'value2'> = objectValues(demo);
			expect(_mixedData).to.deep.equal(['value', 'value2']);
			const _neverData: [] = objectValues({});
			expect(_neverData).to.deep.equal([]);
		});
	});
	describe('objectEntries', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyReadonlyArray<['key', 'value'] | ['key2', 'value2']> = objectEntries({key: 'value', key2: 'value2'} as const);
			const entry = _constData.find(([key]) => key === 'key');
			if (entry?.[0] === 'key') {
				const _constPickValue: 'value' = entry[1]; // ensures the value type is matching 'value' for this tuple type
				expect(_constPickValue).to.equal('value');
			}
			expect(_constData).to.deep.equal([
				['key', 'value'],
				['key2', 'value2'],
			]);
			const _looseData: Array<['key', string]> = objectEntries({key: 'value'});
			expect(_looseData).to.deep.equal([['key', 'value']]);
			const _baseData: Array<[string, string]> = objectEntries<Record<string, string>>({key: 'value'});
			expect(_baseData).to.deep.equal([['key', 'value']]);
			const _mixedData: Array<['key', 'value'] | ['normal', 'value2']> = objectEntries(demo);
			expect(_mixedData).to.deep.equal([
				['key', 'value'],
				['normal', 'value2'],
			]);
			const _neverData: [] = objectEntries({});
			expect(_neverData).to.deep.equal([]);
		});
	});
	describe('objectEntries with map', function () {
		it('should map valid types', function () {
			const entries = objectEntries(mapTest);
			const _constPickValue: NonEmptyArray<'value'> = arrayMap<'value', typeof entries>(entries, ([_key, value]) => value.value);
			expect(_constPickValue).to.deep.equal(['value']);
			const _constPickKey: NonEmptyArray<'key'> = arrayMap(entries, ([key, _value]) => key);
			expect(_constPickKey).to.deep.equal(['key']);
		});
	});
});
