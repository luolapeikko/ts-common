import {describe, expect, it} from 'vitest';
import {NumberCore} from './NumberCore.mjs';

describe('Test NumberCore functions', function () {
	describe('Test NumberCore.number functions', function () {
		it('should get valid value', function () {
			expect(NumberCore.numberFrom('123')).to.equal(123);
			expect(NumberCore.numberFrom(123)).to.equal(123);
			expect(NumberCore.numberFrom('123.5')).to.equal(123.5);
			expect(NumberCore.numberFrom(123.5)).to.equal(123.5);
			expect(NumberCore.numberFrom(123n)).to.equal(123);
		});
		it('it should throw on invalid value', function () {
			expect(() => NumberCore.numberFrom(null)).to.throw(TypeError, 'Invalid Number value: null');
			expect(() => NumberCore.numberFrom(undefined)).to.throw(TypeError, 'Invalid Number value: undefined');
			expect(() => NumberCore.numberFrom('test')).to.throw(TypeError, 'Invalid Number value: "test"');
			expect(() => NumberCore.numberFrom({} as any)).to.throw(TypeError, 'Invalid Number value: {}');
			expect(() => NumberCore.numberFrom(9007199254740992n)).to.throw(RangeError, 'Invalid Number value: 9007199254740992 exceeds safe number range.');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertNumber(null)).to.throw(TypeError, 'Invalid Number value: null');
			expect(() => NumberCore.assertNumber(undefined)).to.throw(TypeError, 'Invalid Number value: undefined');
			expect(() => NumberCore.assertNumber('test')).to.throw(TypeError, 'Invalid Number value: "test"');
			expect(() => NumberCore.assertNumber({} as any)).to.throw(TypeError, 'Invalid Number value: {}');
			expect(() => NumberCore.assertNumber(NaN)).to.throw(TypeError, 'Invalid Number value: NaN');
		});
	});
	describe('Test NumberCore.intFrom function', function () {
		it('should get valid value', function () {
			expect(NumberCore.intFrom('123')).to.equal(123);
			expect(NumberCore.intFrom(123)).to.equal(123);
			expect(NumberCore.intFrom('123.5')).to.equal(123);
			expect(NumberCore.intFrom(123.5)).to.equal(123);
			expect(NumberCore.intFrom(123n)).to.equal(123);
		});
		it('it should throw on invalid value', function () {
			expect(() => NumberCore.intFrom(null)).to.throw(TypeError, 'Invalid Integer value: null');
			expect(() => NumberCore.intFrom(undefined)).to.throw(TypeError, 'Invalid Integer value: undefined');
			expect(() => NumberCore.intFrom('test')).to.throw(TypeError, 'Invalid Integer value: "test"');
			expect(() => NumberCore.intFrom({} as any)).to.throw(TypeError, 'Invalid Integer value: {}');
			expect(() => NumberCore.intFrom(9007199254740992n)).to.throw(RangeError, 'Invalid Integer value: 9007199254740992 exceeds safe integer range.');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertInt(null)).to.throw(TypeError, 'Invalid Integer value: null');
			expect(() => NumberCore.assertInt(undefined)).to.throw(TypeError, 'Invalid Integer value: undefined');
			expect(() => NumberCore.assertInt('test')).to.throw(TypeError, 'Invalid Integer value: "test"');
			expect(() => NumberCore.assertInt({} as any)).to.throw(TypeError, 'Invalid Integer value: {}');
			expect(() => NumberCore.assertInt(NaN)).to.throw(TypeError, 'Invalid Integer value: NaN');
		});
	});
	describe('Test NumberCore.floatFrom function', function () {
		it('should get valid value', function () {
			expect(NumberCore.floatFrom('123.2')).to.equal(123.2);
			expect(NumberCore.floatFrom(123.2)).to.equal(123.2);
			expect(NumberCore.floatFrom('123')).to.equal(123.0);
			expect(NumberCore.floatFrom(123)).to.equal(123.0);
			expect(NumberCore.floatFrom(123n)).to.equal(123.0);
		});
		it('it should throw on invalid value', function () {
			expect(() => NumberCore.floatFrom(null)).to.throw(TypeError, 'Invalid Float value: null');
			expect(() => NumberCore.floatFrom(undefined)).to.throw(TypeError, 'Invalid Float value: undefined');
			expect(() => NumberCore.floatFrom('test')).to.throw(TypeError, 'Invalid Float value: "test"');
			expect(() => NumberCore.floatFrom({} as any)).to.throw(TypeError, 'Invalid Float value: {}');
			expect(() => NumberCore.floatFrom(9007199254740992n)).to.throw(RangeError, 'Invalid Float value: 9007199254740992 exceeds safe float range.');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertFloat(null)).to.throw(TypeError, 'Invalid Float value: null');
			expect(() => NumberCore.assertFloat(undefined)).to.throw(TypeError, 'Invalid Float value: undefined');
			expect(() => NumberCore.assertFloat('test')).to.throw(TypeError, 'Invalid Float value: "test"');
			expect(() => NumberCore.assertFloat({} as any)).to.throw(TypeError, 'Invalid Float value: {}');
			expect(() => NumberCore.assertFloat(NaN)).to.throw(TypeError, 'Invalid Float value: NaN');
		});
	});
	describe('Test NumberCore.bigIntFrom function', function () {
		it('should get valid value', function () {
			expect(NumberCore.bigIntFrom('123')).to.equal(123n);
			expect(NumberCore.bigIntFrom(123)).to.equal(123n);
			expect(NumberCore.bigIntFrom('123.5')).to.equal(123n);
			expect(NumberCore.bigIntFrom(123.5)).to.equal(123n);
			expect(NumberCore.bigIntFrom(123n)).to.equal(123n);
		});
		it('it should throw on invalid value', function () {
			expect(() => NumberCore.bigIntFrom(null)).to.throw(TypeError, 'Invalid BigInt value: null');
			expect(() => NumberCore.bigIntFrom(undefined)).to.throw(TypeError, 'Invalid BigInt value: undefined');
			expect(() => NumberCore.bigIntFrom('test')).to.throw(TypeError, 'Invalid BigInt value: "test"');
			expect(() => NumberCore.bigIntFrom({} as any)).to.throw(TypeError, 'Invalid BigInt value: {}');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertBigInt(null)).to.throw(TypeError, 'Invalid BigInt value: null');
			expect(() => NumberCore.assertBigInt(undefined)).to.throw(TypeError, 'Invalid BigInt value: undefined');
			expect(() => NumberCore.assertBigInt('test')).to.throw(TypeError, 'Invalid BigInt value: "test"');
			expect(() => NumberCore.assertBigInt({} as any)).to.throw(TypeError, 'Invalid BigInt value: {}');
			expect(() => NumberCore.assertBigInt(NaN)).to.throw(TypeError, 'Invalid BigInt value: NaN');
		});
	});
});
