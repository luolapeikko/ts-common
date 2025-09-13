import {describe, expect, it} from 'vitest';
import {excludeKeys, includeKeys, omit, pick, RecordCore} from './RecordCore.mjs';
import {prop} from './RecordMapper.mjs';
import {propEquals, propNotEquals} from './RecordPredicate.mjs';

type User = {
	id: number;
	name: string;
	role: 'admin' | 'user';
	active?: boolean;
};
const user1: User = {id: 1, name: 'Alice', role: 'admin', active: true};
const user2: User = {id: 2, name: 'Bob', role: 'user'};
const users: User[] = [user1, user2, {id: 3, name: 'Carol', role: 'user', active: false}];

describe('deprecated propUtils', () => {
	describe('prop', () => {
		it('returns a function that extracts a property from an object', () => {
			const getName = prop('name');
			expect(getName(user1)).toBe('Alice');
			expect(getName(user2)).toBe('Bob');
		});

		it('can be used with Array.map', () => {
			const getId = prop('id');
			const ids = users.map(getId);
			expect(ids).toEqual([1, 2, 3]);
		});

		it('works with arrays as target (index access)', () => {
			const getFirst = prop(0);
			expect(getFirst(['a', 'b', 'c'])).toBe('a');
			const getSecond = prop(1);
			expect(getSecond(['x', 'y', 'z'])).toBe('y');
		});
	});
	describe('RecordCore.onKey', () => {
		it('returns a function that extracts a property from an object', () => {
			const getName = RecordCore.onKey('name');
			expect(getName(user1)).toBe('Alice');
			expect(getName(user2)).toBe('Bob');
		});

		it('can be used with Array.map', () => {
			const getId = RecordCore.onKey('id');
			const ids = users.map(getId);
			expect(ids).toEqual([1, 2, 3]);
		});

		it('works with arrays as target (index access)', () => {
			const getFirst = RecordCore.onKey(0);
			expect(getFirst(['a', 'b', 'c'])).toBe('a');
			const getSecond = RecordCore.onKey(1);
			expect(getSecond(['x', 'y', 'z'])).toBe('y');
		});
	});
	describe('propEquals & propNotEquals', () => {
		describe('propEquals', () => {
			it('returns a predicate function', () => {
				const predicate = propEquals('role', 'admin');
				expect(typeof predicate).toBe('function');
			});

			it('correctly filters matching values', () => {
				const isAdmin = propEquals('role', 'admin');
				const result = users.filter(isAdmin);
				expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
			});

			it('handles optional properties', () => {
				const isActive = propEquals('active', true);
				const result = users.filter(isActive);
				expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
			});

			it('returns an empty array when no match is found', () => {
				const hasNameDave = propEquals('name', 'Dave');
				const result = users.filter(hasNameDave);
				expect(result).toEqual([]);
			});

			it('works with loosely typed records', () => {
				const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
				const isX = propEquals('type', 'x');
				const result = objects.filter(isX);
				expect(result).toEqual([{type: 'x'}]);
			});
		});

		describe('RecordCore.onKeyEqual', () => {
			it('returns a predicate function', () => {
				const predicate = RecordCore.onKeyEqual('role', 'admin');
				expect(typeof predicate).toBe('function');
			});

			it('correctly filters matching values', () => {
				const isAdmin = RecordCore.onKeyEqual('role', 'admin');
				const result = users.filter(isAdmin);
				expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
			});

			it('handles optional properties', () => {
				const isActive = RecordCore.onKeyEqual('active', true);
				const result = users.filter(isActive);
				expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
			});

			it('returns an empty array when no match is found', () => {
				const hasNameDave = RecordCore.onKeyEqual('name', 'Dave');
				const result = users.filter(hasNameDave);
				expect(result).toEqual([]);
			});

			it('works with loosely typed records', () => {
				const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
				const isX = RecordCore.onKeyEqual('type', 'x');
				const result = objects.filter(isX);
				expect(result).toEqual([{type: 'x'}]);
			});
		});

		describe('propNotEquals', () => {
			it('returns a predicate function', () => {
				const predicate = propNotEquals('role', 'admin');
				expect(typeof predicate).toBe('function');
			});

			it('correctly filters objects where the property does not match', () => {
				const isNotAdmin = propNotEquals('role', 'admin');
				const result = users.filter(isNotAdmin);
				expect(result).toEqual([
					{id: 2, name: 'Bob', role: 'user'},
					{id: 3, name: 'Carol', role: 'user', active: false},
				]);
			});

			it('handles optional properties', () => {
				const isNotActive = propNotEquals('active', true);
				const result = users.filter(isNotActive);
				expect(result).toEqual([
					{id: 2, name: 'Bob', role: 'user'},
					{id: 3, name: 'Carol', role: 'user', active: false},
				]);
			});

			it('returns all objects when no property matches the value', () => {
				const notNamedDave = propNotEquals('name', 'Dave');
				const result = users.filter(notNamedDave);
				expect(result).toEqual(users);
			});

			it('works with loosely typed records', () => {
				const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
				const isNotX = propNotEquals('type', 'x');
				const result = objects.filter(isNotX);
				expect(result).toEqual([{}, {type: 'y'}]);
			});
		});

		describe('RecordCore.onKeyNotEqual', () => {
			it('returns a predicate function', () => {
				const predicate = RecordCore.onKeyNotEqual('role', 'admin');
				expect(typeof predicate).toBe('function');
			});

			it('correctly filters objects where the property does not match', () => {
				const isNotAdmin = RecordCore.onKeyNotEqual('role', 'admin');
				const result = users.filter(isNotAdmin);
				expect(result).toEqual([
					{id: 2, name: 'Bob', role: 'user'},
					{id: 3, name: 'Carol', role: 'user', active: false},
				]);
			});

			it('handles optional properties', () => {
				const isNotActive = RecordCore.onKeyNotEqual('active', true);
				const result = users.filter(isNotActive);
				expect(result).toEqual([
					{id: 2, name: 'Bob', role: 'user'},
					{id: 3, name: 'Carol', role: 'user', active: false},
				]);
			});

			it('returns all objects when no property matches the value', () => {
				const notNamedDave = RecordCore.onKeyNotEqual('name', 'Dave');
				const result = users.filter(notNamedDave);
				expect(result).toEqual(users);
			});

			it('works with loosely typed records', () => {
				const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
				const isNotX = RecordCore.onKeyNotEqual('type', 'x');
				const result = objects.filter(isNotX);
				expect(result).toEqual([{}, {type: 'y'}]);
			});
		});
	});
	describe('pick from object', function () {
		it('should pick value', function () {
			const data = {demo: 'hello', value: null};
			expect(pick(['value'], data)).to.eql({value: null});
			expect(pick(['demo'], data)).to.eql({demo: 'hello'});
			expect(() => pick(['demo'], null as any)).to.throw(TypeError, 'The second argument must be an object.');
		});
		it('should pick from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(pick(['value']))).to.eql([{value: null}]);
			expect(data.map(pick(['demo']))).to.eql([{demo: 'hello'}]);
		});
		it('should RecordCore.pick from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(RecordCore.pick(['value']))).to.eql([{value: null}]);
			expect(data.map(RecordCore.pick(['demo']))).to.eql([{demo: 'hello'}]);
		});
	});
	describe('omit from object', function () {
		it('should omit value', function () {
			const data = {demo: 'hello', value: null};
			expect(omit(['value'], data)).to.eql({demo: 'hello'});
			expect(omit(['demo'], data)).to.eql({value: null});
			expect(() => omit(['demo'], null as any)).to.throw(TypeError, 'The second argument must be an object.');
		});
		it('should omit from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(omit(['value']))).to.eql([{demo: 'hello'}]);
			expect(data.map(omit(['demo']))).to.eql([{value: null}]);
		});
		it('should RecordCore.omit from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(RecordCore.omit(['value']))).to.eql([{demo: 'hello'}]);
			expect(data.map(RecordCore.omit(['demo']))).to.eql([{value: null}]);
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
