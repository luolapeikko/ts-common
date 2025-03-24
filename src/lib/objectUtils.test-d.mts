import {assertType, describe, it} from 'vitest';
import {excludeKeys, includeKeys} from './objectUtils.mjs';

const propertySymbol = Symbol('test');
const object = {
	foo: 'foo',
	bar: 1,
	[propertySymbol]: true,
};

describe('object Key filtering', function () {
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
