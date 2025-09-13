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

const testObject = {
	foo: 'foo',
	bar: 1,
	[propertySymbol]: true,
};

type TestObject = typeof testObject;

describe('object Key filtering', function () {
	describe('isRecord Types', function () {
		it('should check valid isRecord types', function () {
			const test = testObject as TestObject | null;
			if (R.is(test)) {
				assertType<TestObject>(test);
			}
			if (R.is<TestObject | null | string>(test)) {
				assertType<TestObject>(test);
			}
		});
		it('should give error if strict type', function () {
			const test = testObject as TestObject | null;
			// @ts-expect-error Argument of type '{ foo: "foo"; bar: 1; [propertySymbol]: true; } | null' is not assignable to parameter of type 'string | null'.
			R.is<null | string>(test);
		});
	});
	describe('isNotRecord Types', function () {
		it('should check valid isNotRecord types', function () {
			const test = null as TestObject | null;
			if (R.isNot(test)) {
				assertType<null>(test);
			}
		});
		it('should give error if strict type', function () {
			const test = null as TestObject | null;
			// @ts-expect-error Argument of type '{ foo: "foo"; bar: 1; [propertySymbol]: true; } | null' is not assignable to parameter of type 'string | null'.
			R.isNot<null | string>(test);
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
	describe('includeKeys Types', function () {
		it('should assert valid includeKeys types', function () {
			assertType<Partial<typeof testObject>>(
				includeKeys(testObject, (key, value) => {
					assertType<'foo' | 'bar' | typeof propertySymbol>(key);
					assertType<string | number | boolean>(value);
					return false;
				}),
			);
			assertType<{foo: string}>(includeKeys(testObject, ['foo']));
			assertType<{foo: string}>(includeKeys(testObject, new Set<'foo'>(['foo'])));
			assertType<{[propertySymbol]: boolean}>(includeKeys(testObject, [propertySymbol]));
		});
		it('should assert invalid includeKeys types', function () {
			// @ts-expect-error Type 'undefined' is not assignable to type 'string'.
			assertType<typeof testObject>(includeKeys(testObject, () => false));
			// @ts-expect-error Type 'Pick<{ foo: string; bar: number; [propertySymbol]: boolean; }, "foo">' is missing the following properties from type '{ foo: string; bar: number; [propertySymbol]: boolean; }': bar, [propertySymbol]
			assertType<typeof testObject>(includeKeys(testObject, ['foo']));
			// @ts-expect-error Argument of type 'string[]' is not assignable to parameter of type 'KeyCallback<{ foo: string; bar: number; [propertySymbol]: boolean; }, "foo" | "bar" | unique symbol>'
			assertType(includeKeys(testObject, ['baz']));
		});
	});
	describe('excludeKeys Types', function () {
		it('should assert valid excludeKeys types', function () {
			assertType<Partial<typeof testObject>>(
				excludeKeys(testObject, (key, value) => {
					assertType<'foo' | 'bar' | typeof propertySymbol>(key);
					assertType<string | number | boolean>(value);

					return false;
				}),
			);
			assertType<{bar: number; [propertySymbol]: boolean}>(excludeKeys(testObject, ['foo']));
			assertType<{bar: number; [propertySymbol]: boolean}>(excludeKeys(testObject, new Set<'foo'>(['foo'])));
			assertType<{foo: string; bar: number}>(excludeKeys(testObject, [propertySymbol]));

			type UnionOfObjects = {type: 'foo'; foo: string} | {type: 'bar'; bar: number};
			const object2: UnionOfObjects = {type: 'foo', foo: 'test'};
			assertType<{foo: string} | {bar: number}>(excludeKeys(object2, ['type']));
		});
		it('should assert invalid excludeKeys types', function () {
			// @ts-expect-error Type 'undefined' is not assignable to type 'string'.
			assertType<typeof testObject>(excludeKeys(testObject, () => false));
			// @ts-expect-error Property 'foo' is missing in type 'Omit<{ foo: string; bar: number; [propertySymbol]: boolean; }, "foo">' but required in type '{ foo: string; bar: number; [propertySymbol]: boolean; }'
			assertType<typeof testObject>(excludeKeys(testObject, ['foo']));
			// @ts-expect-error Argument of type 'string[]' is not assignable to parameter of type 'KeyCallback<{ foo: string; bar: number; [propertySymbol]: boolean; }, unique symbol | "foo" | "bar">'
			assertType(excludeKeys(testObject, ['baz']));
		});
	});
	describe('entries Types', function () {
		it('should assert valid entries types', function () {
			const entries = R.entries(testObject);
			assertType<(['bar', number] | ['foo', string] | [typeof propertySymbol, boolean])[]>(entries);
		});
		it('should assert invalid entries types', function () {
			// @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'object'.
			R.entries('test');
		});
	});
	describe('values Types', function () {
		it('should assert valid values types', function () {
			const values = R.values(testObject);
			assertType<(string | number | boolean)[]>(values);
		});
		it('should assert invalid values types', function () {
			// @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'object'.
			R.values('test');
		});
	});
	describe('keys Types', function () {
		it('should assert valid keys types', function () {
			const keys = R.keys(testObject);
			assertType<('bar' | 'foo' | typeof propertySymbol)[]>(keys);
		});
		it('should assert invalid keys types', function () {
			// @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'object'.
			R.keys('test');
		});
	});
});
