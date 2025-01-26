import {describe, expect, it} from 'vitest';
import {excludeKeys, includeKeys} from '../src/index.mjs';

describe('object Key filtering', function () {
	describe('includeKeys', () => {
		it('should filter with callback boolean', function () {
			expect(Object.keys(includeKeys({foo: true, bar: false}, () => true)).length).to.be.eq(2);
			expect(Object.keys(includeKeys({foo: true, bar: false}, () => false)).length).to.be.eq(0);
		});

		it('should filter with specific key', function () {
			expect(includeKeys({foo: true}, (key) => key === 'foo').foo).to.be.eq(true);
		});

		it('should filter with specific value', function () {
			expect(includeKeys({foo: 'test'}, (key, value) => value === 'test').foo, 'test');
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
			const Parent = class {
				it() {}
			};
			const Child = class extends Parent {};
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
			expect(excludeKeys({foo: 'test'}, (key, value) => value !== 'test').foo, 'test');
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
			expect((excludeKeys(input, () => false) as any).test, undefined);
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
			const Parent = class {
				it() {}
			};
			const Child = class extends Parent {};
			const input = new Child();
			expect((excludeKeys(input, () => false) as any).test, undefined);
		});

		it('should keep object  __proto__ keys', function () {
			const input = {__proto__: {foo: true}};
			expect(excludeKeys(input, () => false)).to.be.eql(input);
		});
	});
});
