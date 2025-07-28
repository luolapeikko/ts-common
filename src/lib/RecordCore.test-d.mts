import {assertType, describe, it} from 'vitest';
import {excludeKeys, includeKeys, RecordCore as R} from './RecordCore.mjs';

const propertySymbol = Symbol('test');
type Data = {demo: string; value: number | null};

type User = {
	id: number;
	name: string;
	role: 'admin' | 'user';
	active?: boolean;
};

const object = {
	foo: 'foo',
	bar: 1,
	[propertySymbol]: true,
};

describe('object Key filtering', function () {
	describe('isRecord Types', function () {
		it('should assert valid isRecord types', function () {
			const test = {bar: 1, foo: 'foo', [propertySymbol]: true} as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			if (R.is(test)) {
				assertType<Record<string, unknown>>(test);
			}
		});
	});
	describe('isNotRecord Types', function () {
		it('should assert valid isNotRecord types', function () {
			const test = null as {foo: 'foo'; bar: 1; [propertySymbol]: true} | null;
			if (R.isNot(test)) {
				assertType<null>(test);
			}
		});
	});
	describe('pick from object', function () {
		it('should pick value', function () {
			const data: Data = {demo: 'hello', value: null};
			assertType<Pick<Data, 'value'>>(R.pick(['value'], data));
		});
		it('should pick from map', function () {
			const dataArray: Data[] = [{demo: 'hello', value: null}];
			assertType<Pick<Data, 'demo'>[]>(dataArray.map(R.pick(['demo'])));
		});
	});
	describe('omit from object', function () {
		it('should omit value', function () {
			const data: Data = {demo: 'hello', value: null};
			assertType<Omit<Data, 'value'>>(R.omit(['value'], data));
		});
		it('should omit from map', function () {
			const dataArray: Data[] = [{demo: 'hello', value: null}];
			assertType<Omit<Data, 'demo'>[]>(dataArray.map(R.omit(['demo'])));
		});
	});
	describe('Test onKey types', () => {
		it('infers types strictly with generic <T, K>', () => {
			const getRole = R.onKey<User, 'role'>('role');
			assertType<(target: User) => 'admin' | 'user'>(getRole);
		});

		it('infers key type correctly in curried generic version', () => {
			const getId = R.onKey('id');
			assertType<(target: {id: number}) => number>(getId);

			const getLength = R.onKey('length');
			assertType<(target: any[]) => number>(getLength);
		});
	});
	describe('Test onKeyEqual types', () => {
		it('should be correct onKeyEqual types', () => {
			const fn = R.onKeyEqual<User, 'role'>('role', 'user');
			assertType<(obj: User) => boolean>(fn);
			const looseFn = R.onKeyEqual('active', true);
			assertType<(obj: {active?: boolean}) => boolean>(looseFn);
		});
	});
	describe('Test onKey types', () => {
		it('should be correct onKeyNotEqual types', () => {
			const fn = R.onKeyNotEqual<User, 'role'>('role', 'user');
			assertType<(obj: User) => boolean>(fn);
			const looseFn = R.onKeyNotEqual('active', true);
			assertType<(obj: {active?: boolean}) => boolean>(looseFn);
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
