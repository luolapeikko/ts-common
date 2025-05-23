import {describe, expect, it} from 'vitest';
import {type NonEmptyArray, type NonEmptyReadonlyArray} from '../types/NonEmptyArray.mjs';
import {arrayMap} from './arrayMapUtils.mjs';
import {excludeKeys, includeKeys, objectEntries, objectKeys, objectValues} from './objectUtils.mjs';

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
		it('should have valid key array types', function () {
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
		it('should have valid value array types', function () {
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
		it('should have valid entry types', function () {
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
			const _optionalData: Array<['key', string | undefined]> = objectEntries<Partial<Record<'key', string>>>({key: 'value'});
			expect(_optionalData).to.deep.equal([['key', 'value']]);
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
	describe('includeKeys', () => {
		it('should filter with callback boolean', function () {
			expect(Object.keys(includeKeys({foo: true, bar: false}, () => true)).length).to.be.eq(2);
			expect(Object.keys(includeKeys({foo: true, bar: false}, () => false)).length).to.be.eq(0);
		});

		it('should filter with specific key', function () {
			expect(includeKeys({foo: true}, (key) => key === 'foo').foo).to.be.eq(true);
		});

		it('should filter with specific value', function () {
			expect(includeKeys({foo: 'test'}, (key, value) => value === 'test').foo).to.be.eq('test');
		});

		it('should filter with object value', function () {
			expect(includeKeys({foo: true}, (key, value, object) => object.foo).foo).to.be.eq(true);
		});

		it('should filter with iterables', function () {
			expect(Object.keys(includeKeys({foo: true, bar: false}, ['foo']))).to.be.eql(['foo']);
			expect(Object.keys(includeKeys({foo: true, bar: false}, new Set<'foo'>(['foo'])))).to.be.eql(['foo']);
		});

		it('should keep symbol properties', function () {
			const symbol = Symbol('test');
			const input = {[symbol]: true};
			expect(includeKeys(input, () => true)[symbol]).to.be.eq(true);
		});

		it('should drop non-enumerable properties', function () {
			const input = Object.defineProperty({}, 'test', {value: true, enumerable: false});
			expect((includeKeys(input, () => true) as any).test).to.be.eq(undefined);
		});

		it('should keep enumerable properties', function () {
			const input = Object.defineProperty({}, 'test', {value: true, enumerable: true});
			expect((includeKeys(input, () => true) as any).test).to.be.eq(true);
		});

		it('should keep property descriptors', function () {
			const descriptor = {
				get() {},
				set() {},
				enumerable: true,
				configurable: false,
			};

			const input = Object.defineProperty({}, 'test', descriptor) as {test: unknown};
			expect(
				Object.getOwnPropertyDescriptor(
					includeKeys(input, () => true),
					'test',
				),
			).to.be.eql(descriptor);
			expect(Object.getOwnPropertyDescriptor(includeKeys(input, ['test']), 'test')).to.be.eql(descriptor);
		});

		it('should keep inherited properties', function () {
			class Parent {
				it() {}
			}
			class Child extends Parent {}
			const input = new Child();
			expect(typeof includeKeys(input, () => true).it).to.be.eq('function');
		});

		it('should keep object  __proto__ keys', function () {
			const input = {__proto__: {foo: true}};
			expect(includeKeys(input, () => true)).to.be.eql(input);
		});
	});
	describe('excludeKeys', () => {
		it('should filter with callback boolean', function () {
			expect(Object.keys(excludeKeys({foo: true, bar: false}, () => true)).length).to.be.eq(0);
			expect(Object.keys(excludeKeys({foo: true, bar: false}, () => false)).length).to.be.eq(2);
		});

		it('should filter with specific key', function () {
			expect(excludeKeys({foo: true}, (key) => key !== 'foo').foo).to.be.eq(true);
		});

		it('should filter with specific value', function () {
			expect(excludeKeys({foo: 'test'}, (key, value) => value !== 'test').foo).to.be.eql('test');
		});

		it('should filter with specific object value', function () {
			expect(excludeKeys({foo: true}, (key, value, object) => !object.foo).foo).to.be.eq(true);
		});

		it('should filter with iterables', function () {
			expect(Object.keys(excludeKeys({foo: true, bar: false}, ['bar']))).to.be.eql(['foo']);
			expect(Object.keys(excludeKeys({foo: true, bar: false}, new Set(['bar'])))).to.be.eql(['foo']);
		});

		it('should keep symbol properties', function () {
			const symbol = Symbol('test');
			const input = {[symbol]: true};
			expect(excludeKeys(input, () => false)[symbol]).to.be.eq(true);
		});

		it('should drop non-enumerable properties', function () {
			const input = Object.defineProperty({}, 'test', {value: true, enumerable: false});
			expect((excludeKeys(input, () => false) as any).test).to.be.eql(undefined);
		});

		it('should keep property descriptors', function () {
			const descriptor = {
				get() {},
				set() {},
				enumerable: true,
				configurable: false,
			};

			const input = Object.defineProperty({}, 'test', descriptor);
			expect(
				Object.getOwnPropertyDescriptor(
					excludeKeys(input, () => false),
					'test',
				),
			).to.be.eql(descriptor);
			expect(Object.getOwnPropertyDescriptor(excludeKeys(input, []), 'test')).to.be.eql(descriptor);
		});

		it('should keep inherited properties', function () {
			class Parent {
				it() {}
			}
			class Child extends Parent {}
			const input = new Child();
			expect((excludeKeys(input, () => false) as any).test).to.be.eql(undefined);
		});

		it('should keep object  __proto__ keys', function () {
			const input = {__proto__: {foo: true}};
			expect(excludeKeys(input, () => false)).to.be.eql(input);
		});
	});
});
