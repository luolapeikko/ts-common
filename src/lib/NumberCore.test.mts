import {describe, expect, it} from 'vitest';
import {NumberCore} from './NumberCore.mjs';

describe('Test NumberCore functions', function () {
	describe('Test NumberCore.intFrom function', function () {
		it('should get valid value', function () {
			expect(NumberCore.intFrom('123')).to.equal(123);
			expect(NumberCore.intFrom(123)).to.equal(123);
			expect(NumberCore.intFrom('123.5')).to.equal(123);
			expect(NumberCore.intFrom(123.5)).to.equal(123);
		});
		it('it should throw on invalid value', function () {
			expect(() => NumberCore.intFrom(null)).to.throw(TypeError, 'Invalid integer: null');
			expect(() => NumberCore.intFrom(undefined)).to.throw(TypeError, 'Invalid integer: undefined');
			expect(() => NumberCore.intFrom('test')).to.throw(TypeError, 'Invalid integer: "test"');
			expect(() => NumberCore.intFrom({} as any)).to.throw(TypeError, 'Invalid integer: {}');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertInt(null)).to.throw(TypeError, 'Invalid integer: null');
			expect(() => NumberCore.assertInt(undefined)).to.throw(TypeError, 'Invalid integer: undefined');
			expect(() => NumberCore.assertInt('test')).to.throw(TypeError, 'Invalid integer: "test"');
			expect(() => NumberCore.assertInt({} as any)).to.throw(TypeError, 'Invalid integer: {}');
		});
	});
	describe('Test NumberCore.floatFrom function', function () {
		it('should get valid value', function () {
			expect(NumberCore.floatFrom('123.2')).to.equal(123.2);
			expect(NumberCore.floatFrom(123.2)).to.equal(123.2);
			expect(NumberCore.floatFrom('123')).to.equal(123.0);
			expect(NumberCore.floatFrom(123)).to.equal(123.0);
		});
		it('it should throw on invalid value', function () {
			expect(() => NumberCore.floatFrom(null)).to.throw(TypeError, 'Invalid float: null');
			expect(() => NumberCore.floatFrom(undefined)).to.throw(TypeError, 'Invalid float: undefined');
			expect(() => NumberCore.floatFrom('test')).to.throw(TypeError, 'Invalid float: "test"');
			expect(() => NumberCore.floatFrom({} as any)).to.throw(TypeError, 'Invalid float: {}');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertFloat(null)).to.throw(TypeError, 'Invalid float: null');
			expect(() => NumberCore.assertFloat(undefined)).to.throw(TypeError, 'Invalid float: undefined');
			expect(() => NumberCore.assertFloat('test')).to.throw(TypeError, 'Invalid float: "test"');
			expect(() => NumberCore.assertFloat({} as any)).to.throw(TypeError, 'Invalid float: {}');
		});
	});
});
