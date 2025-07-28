import {describe, expect, it} from 'vitest';
import {type NonEmptyArray, type NonEmptyReadonlyArray} from '../types/NonEmptyArray.mjs';
import {ArrayCore as A} from './ArrayCore.mjs';
import {excludeKeys, includeKeys, RecordCore as R} from './RecordCore.mjs';

const propertySymbol = Symbol('test');

type User = {
	id: number;
	name: string;
	role: 'admin' | 'user';
	active?: boolean;
};
const user1: User = {id: 1, name: 'Alice', role: 'admin', active: true};
const user2: User = {id: 2, name: 'Bob', role: 'user'};
const users: User[] = [user1, user2, {id: 3, name: 'Carol', role: 'user', active: false}];

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

describe('recordUtils', function () {
	describe('RecordCore.assert', function () {
		it('should assert valid RecordCore.assert types', function () {
			const test = {bar: 1, foo: 'foo', [propertySymbol]: true} as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			expect(() => R.assert(test)).not.to.throw();
		});
		it('should assert invalid RecordCore.assert types', function () {
			expect(() => R.assert(null)).to.throw('Invalid object: null');
		});
	});
	describe('RecordCore.is Types', function () {
		it('should assert valid RecordCore.is types', function () {
			const test = {bar: 1, foo: 'foo', [propertySymbol]: true} as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			expect(R.is(test)).to.be.eq(true);
		});
	});
	describe('RecordCore.isNot Types', function () {
		it('should assert valid RecordCore.isNot types', function () {
			const test = null as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			expect(R.isNot(test)).to.be.eq(true);
		});
	});
	describe('pick from object', function () {
		it('should pick value', function () {
			const data = {demo: 'hello', value: null};
			expect(R.pick(['value'], data)).to.eql({value: null});
			expect(R.pick(['demo'], data)).to.eql({demo: 'hello'});
			expect(() => R.pick(['demo'], null as any)).to.throw(TypeError, 'The second argument must be an object.');
		});
		it('should pick from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(R.pick(['value']))).to.eql([{value: null}]);
			expect(data.map(R.pick(['demo']))).to.eql([{demo: 'hello'}]);
		});
	});
	describe('omit from object', function () {
		it('should omit value', function () {
			const data = {demo: 'hello', value: null};
			expect(R.omit(['value'], data)).to.eql({demo: 'hello'});
			expect(R.omit(['demo'], data)).to.eql({value: null});
			expect(() => R.omit(['demo'], null as any)).to.throw(TypeError, 'The second argument must be an object.');
		});
		it('should omit from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(R.omit(['value']))).to.eql([{demo: 'hello'}]);
			expect(data.map(R.omit(['demo']))).to.eql([{value: null}]);
		});
	});
	describe('onKey', () => {
		it('returns a function that extracts a property from an object', () => {
			const getName = R.onKey('name');
			expect(getName(user1)).toBe('Alice');
			expect(getName(user2)).toBe('Bob');
		});

		it('can be used with Array.map', () => {
			const getId = R.onKey('id');
			const ids = users.map(getId);
			expect(ids).toEqual([1, 2, 3]);
		});

		it('works with arrays as target (index access)', () => {
			const getFirst = R.onKey(0);
			expect(getFirst(['a', 'b', 'c'])).toBe('a');
			const getSecond = R.onKey(1);
			expect(getSecond(['x', 'y', 'z'])).toBe('y');
		});
	});
	describe('onKeyEqual', () => {
		it('returns a predicate function', () => {
			const predicate = R.onKeyEqual('role', 'admin');
			expect(typeof predicate).toBe('function');
		});

		it('correctly filters matching values', () => {
			const isAdmin = R.onKeyEqual('role', 'admin');
			const result = users.filter(isAdmin);
			expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
		});

		it('handles optional properties', () => {
			const isActive = R.onKeyEqual('active', true);
			const result = users.filter(isActive);
			expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
		});

		it('returns an empty array when no match is found', () => {
			const hasNameDave = R.onKeyEqual('name', 'Dave');
			const result = users.filter(hasNameDave);
			expect(result).toEqual([]);
		});

		it('works with loosely typed records', () => {
			const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
			const isX = R.onKeyEqual('type', 'x');
			const result = objects.filter(isX);
			expect(result).toEqual([{type: 'x'}]);
		});
	});

	describe('propNotEquals', () => {
		it('returns a predicate function', () => {
			const predicate = R.onKeyNotEqual('role', 'admin');
			expect(typeof predicate).toBe('function');
		});

		it('correctly filters objects where the property does not match', () => {
			const isNotAdmin = R.onKeyNotEqual('role', 'admin');
			const result = users.filter(isNotAdmin);
			expect(result).toEqual([
				{id: 2, name: 'Bob', role: 'user'},
				{id: 3, name: 'Carol', role: 'user', active: false},
			]);
		});

		it('handles optional properties', () => {
			const isNotActive = R.onKeyNotEqual('active', true);
			const result = users.filter(isNotActive);
			expect(result).toEqual([
				{id: 2, name: 'Bob', role: 'user'},
				{id: 3, name: 'Carol', role: 'user', active: false},
			]);
		});

		it('returns all objects when no property matches the value', () => {
			const notNamedDave = R.onKeyNotEqual('name', 'Dave');
			const result = users.filter(notNamedDave);
			expect(result).toEqual(users);
		});

		it('works with loosely typed records', () => {
			const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
			const isNotX = R.onKeyNotEqual('type', 'x');
			const result = objects.filter(isNotX);
			expect(result).toEqual([{}, {type: 'y'}]);
		});
	});
	describe('objectKeys', function () {
		it('should have valid key array types', function () {
			const _constData: NonEmptyReadonlyArray<'key'> = R.keys({key: 'value'} as const);
			expect(_constData).to.deep.equal(['key']);
			const _looseData: 'key'[] = R.keys({key: 'value'});
			expect(_looseData).to.deep.equal(['key']);
			const _baseData: string[] = R.keys<Record<string, string>>({key: 'value'});
			expect(_baseData).to.deep.equal(['key']);
			const _mixedData: ('key' | 'normal')[] = R.keys(demo);
			expect(_mixedData).to.deep.equal(['key', 'normal']);
			const _neverData: [] = R.keys({});
			expect(_neverData).to.deep.equal([]);
		});
	});
	describe('objectValues', function () {
		it('should have valid value array types', function () {
			const _constData: NonEmptyReadonlyArray<'value'> = R.values({key: 'value'} as const);
			expect(_constData).to.deep.equal(['value']);
			const _looseData: string[] = R.values({key: 'value'});
			expect(_looseData).to.deep.equal(['value']);
			const _baseData: string[] = R.values<Record<string, string>>({key: 'value'});
			expect(_baseData).to.deep.equal(['value']);
			const _mixedData: ('value' | 'value2')[] = R.values(demo);
			expect(_mixedData).to.deep.equal(['value', 'value2']);
			const _neverData: [] = R.values({});
			expect(_neverData).to.deep.equal([]);
		});
	});
	describe('objectEntries', function () {
		it('should have valid entry types', function () {
			const _constData: NonEmptyReadonlyArray<['key', 'value'] | ['key2', 'value2']> = R.entries({key: 'value', key2: 'value2'} as const);
			const entry = _constData.find(([key]) => key === 'key');
			if (entry?.[0] === 'key') {
				const _constPickValue: 'value' = entry[1]; // ensures the value type is matching 'value' for this tuple type
				expect(_constPickValue).to.equal('value');
			}
			expect(_constData).to.deep.equal([
				['key', 'value'],
				['key2', 'value2'],
			]);
			const _looseData: ['key', string][] = R.entries({key: 'value'});
			expect(_looseData).to.deep.equal([['key', 'value']]);
			const _baseData: [string, string][] = R.entries<Record<string, string>>({key: 'value'});
			expect(_baseData).to.deep.equal([['key', 'value']]);
			const _optionalData: ['key', string | undefined][] = R.entries<Partial<Record<'key', string>>>({key: 'value'});
			expect(_optionalData).to.deep.equal([['key', 'value']]);
			const _mixedData: (['key', 'value'] | ['normal', 'value2'])[] = R.entries(demo);
			expect(_mixedData).to.deep.equal([
				['key', 'value'],
				['normal', 'value2'],
			]);
			const _neverData: [] = R.entries({});
			expect(_neverData).to.deep.equal([]);
		});
	});
	describe('objectEntries with map', function () {
		it('should map valid types', function () {
			const entries = R.entries(mapTest);
			const _constPickValue: NonEmptyArray<'value'> = A.map<'value', typeof entries>(entries, ([_key, value]) => value.value);
			expect(_constPickValue).to.deep.equal(['value']);
			const _constPickKey: NonEmptyArray<'key'> = A.map(entries, ([key, _value]) => key);
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
				get(): void {},
				set(): void {},
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
				it(): void {}
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
				get(): void {},
				set(): void {},
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
				it(): void {}
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
