import {assertType, describe, expect, it} from 'vitest';
import {excludeKeys, includeKeys, omit, pick} from './RecordCore.mjs';
import {prop} from './RecordMapper.mjs';
import {propEquals, propNotEquals} from './RecordPredicate.mjs';

type Data = {demo: string; value: number | null};
type User = {
	id: number;
	name: string;
	role: 'admin' | 'user';
	active?: boolean;
};
const user1: User = {id: 1, name: 'Alice', role: 'admin'};
const user2: User = {id: 2, name: 'Bob', role: 'user'};
const users: User[] = [user1, user2];

const propertySymbol = Symbol('test');
const object = {
	foo: 'foo',
	bar: 1,
	[propertySymbol]: true,
};

describe('Test propUtils types', () => {
	describe('Test prop types', () => {
		it('infers types strictly with generic <T, K>', () => {
			const getRole = prop<User, 'role'>('role');
			assertType<(target: User) => 'admin' | 'user'>(getRole);
			const user = users[0];
			if (!user) {
				return;
			}
			expect(getRole(user)).toBe('admin');
		});

		it('infers key type correctly in curried generic version', () => {
			const getId = prop('id');
			assertType<(target: {id: number}) => number>(getId);

			const getLength = prop('length');
			assertType<(target: any[]) => number>(getLength);
		});
	});
	describe('Test propEquals types', () => {
		it('Test propEquals types', () => {
			const fn = propEquals<User, 'role'>('role', 'user');
			assertType<(obj: User) => boolean>(fn);
			const looseFn = propEquals('active', true);
			assertType<(obj: {active?: boolean}) => boolean>(looseFn);
		});
	});
	describe('Test propNotEquals types', () => {
		it('Test propNotEquals types', () => {
			const fn = propNotEquals<User, 'role'>('role', 'user');
			assertType<(obj: User) => boolean>(fn);
			const looseFn = propNotEquals('active', true);
			assertType<(obj: {active?: boolean}) => boolean>(looseFn);
		});
	});
	describe('pick from object', function () {
		it('should pick value', function () {
			const data: Data = {demo: 'hello', value: null};
			assertType<Pick<Data, 'value'>>(pick(['value'], data));
		});
		it('should pick from map', function () {
			const dataArray: Data[] = [{demo: 'hello', value: null}];
			assertType<Pick<Data, 'demo'>[]>(dataArray.map(pick(['demo'])));
		});
	});
	describe('omit from object', function () {
		it('should omit value', function () {
			const data: Data = {demo: 'hello', value: null};
			assertType<Omit<Data, 'value'>>(omit(['value'], data));
		});
		it('should omit from map', function () {
			const dataArray: Data[] = [{demo: 'hello', value: null}];
			assertType<Omit<Data, 'demo'>[]>(dataArray.map(omit(['demo'])));
		});
	});
	describe('includeKeys Types', function () {
		it('should assert valid includeKeys types', function () {
			assertType<Partial<typeof object>>(
				includeKeys(object, (key, value) => {
					assertType<'foo' | 'bar' | typeof propertySymbol>(key);
					assertType<string | number | boolean>(value);
					return false;
				}),
			);
			assertType<{foo: string}>(includeKeys(object, ['foo']));
			assertType<{foo: string}>(includeKeys(object, new Set<'foo'>(['foo'])));
			assertType<{[propertySymbol]: boolean}>(includeKeys(object, [propertySymbol]));
		});
		it('should assert invalid includeKeys types', function () {
			// @ts-expect-error Type 'undefined' is not assignable to type 'string'.
			assertType<typeof object>(includeKeys(object, () => false));
			// @ts-expect-error Type 'Pick<{ foo: string; bar: number; [propertySymbol]: boolean; }, "foo">' is missing the following properties from type '{ foo: string; bar: number; [propertySymbol]: boolean; }': bar, [propertySymbol]
			assertType<typeof object>(includeKeys(object, ['foo']));
			// @ts-expect-error Argument of type 'string[]' is not assignable to parameter of type 'KeyCallback<{ foo: string; bar: number; [propertySymbol]: boolean; }, "foo" | "bar" | unique symbol>'
			assertType(includeKeys(object, ['baz']));
		});
	});
	describe('excludeKeys Types', function () {
		it('should assert valid excludeKeys types', function () {
			assertType<Partial<typeof object>>(
				excludeKeys(object, (key, value) => {
					assertType<'foo' | 'bar' | typeof propertySymbol>(key);
					assertType<string | number | boolean>(value);

					return false;
				}),
			);
			assertType<{bar: number; [propertySymbol]: boolean}>(excludeKeys(object, ['foo']));
			assertType<{bar: number; [propertySymbol]: boolean}>(excludeKeys(object, new Set<'foo'>(['foo'])));
			assertType<{foo: string; bar: number}>(excludeKeys(object, [propertySymbol]));

			type UnionOfObjects = {type: 'foo'; foo: string} | {type: 'bar'; bar: number};
			const object2: UnionOfObjects = {type: 'foo', foo: 'test'};
			assertType<{foo: string} | {bar: number}>(excludeKeys(object2, ['type']));
		});
		it('should assert invalid excludeKeys types', function () {
			// @ts-expect-error Type 'undefined' is not assignable to type 'string'.
			assertType<typeof object>(excludeKeys(object, () => false));
			// @ts-expect-error Property 'foo' is missing in type 'Omit<{ foo: string; bar: number; [propertySymbol]: boolean; }, "foo">' but required in type '{ foo: string; bar: number; [propertySymbol]: boolean; }'
			assertType<typeof object>(excludeKeys(object, ['foo']));
			// @ts-expect-error Argument of type 'string[]' is not assignable to parameter of type 'KeyCallback<{ foo: string; bar: number; [propertySymbol]: boolean; }, unique symbol | "foo" | "bar">'
			assertType(excludeKeys(object, ['baz']));
		});
	});
});
