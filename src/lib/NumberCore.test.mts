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
			expect(() => NumberCore.numberFrom(null)).to.throw(TypeError, 'Invalid value: expected a Number, got null [object]');
			expect(() => NumberCore.numberFrom(undefined)).to.throw(TypeError, 'Invalid value: expected a Number, got [undefined]');
			expect(() => NumberCore.numberFrom('test')).to.throw(TypeError, 'Invalid value: expected a Number, got "test" [string]');
			expect(() => NumberCore.numberFrom({} as any)).to.throw(TypeError, 'Invalid value: expected a Number, got {} [object]');
			expect(() => NumberCore.numberFrom(9007199254740992n)).to.throw(RangeError, 'Invalid value: Number error, 9007199254740992 exceeds safe number range.');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertNumber(null)).to.throw(TypeError, 'Invalid value: expected a Number, got null [object]');
			expect(() => NumberCore.assertNumber(undefined)).to.throw(TypeError, 'Invalid value: expected a Number, got [undefined]');
			expect(() => NumberCore.assertNumber('test')).to.throw(TypeError, 'Invalid value: expected a Number, got "test" [string]');
			expect(() => NumberCore.assertNumber({} as any)).to.throw(TypeError, 'Invalid value: expected a Number, got {} [object]');
			expect(() => NumberCore.assertNumber(NaN)).to.throw(TypeError, 'Invalid value: expected a Number, got NaN [number]');
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
			expect(() => NumberCore.intFrom(null)).to.throw(TypeError, 'Invalid value: expected an Integer, got null [object]');
			expect(() => NumberCore.intFrom(undefined)).to.throw(TypeError, 'Invalid value: expected an Integer, got [undefined]');
			expect(() => NumberCore.intFrom('test')).to.throw(TypeError, 'Invalid value: expected an Integer, got "test" [string]');
			expect(() => NumberCore.intFrom({} as any)).to.throw(TypeError, 'Invalid value: expected an Integer, got {} [object]');
			expect(() => NumberCore.intFrom(9007199254740992n)).to.throw(RangeError, 'Invalid value: Integer error, 9007199254740992 exceeds safe integer range.');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertInt(null)).to.throw(TypeError, 'Invalid value: expected an Integer, got null [object]');
			expect(() => NumberCore.assertInt(undefined)).to.throw(TypeError, 'Invalid value: expected an Integer, got [undefined]');
			expect(() => NumberCore.assertInt('test')).to.throw(TypeError, 'Invalid value: expected an Integer, got "test" [string]');
			expect(() => NumberCore.assertInt({} as any)).to.throw(TypeError, 'Invalid value: expected an Integer, got {} [object]');
			expect(() => NumberCore.assertInt(NaN)).to.throw(TypeError, 'Invalid value: expected an Integer, got NaN [number]');
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
			expect(() => NumberCore.floatFrom(null)).to.throw(TypeError, 'Invalid value: expected a Float, got null [object]');
			expect(() => NumberCore.floatFrom(undefined)).to.throw(TypeError, 'Invalid value: expected a Float, got [undefined]');
			expect(() => NumberCore.floatFrom('test')).to.throw(TypeError, 'Invalid value: expected a Float, got "test" [string]');
			expect(() => NumberCore.floatFrom({} as any)).to.throw(TypeError, 'Invalid value: expected a Float, got {} [object]');
			expect(() => NumberCore.floatFrom(9007199254740992n)).to.throw(RangeError, 'Invalid value: Float error, 9007199254740992 exceeds safe float range.');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertFloat(null)).to.throw(TypeError, 'Invalid value: expected a Float, got null [object]');
			expect(() => NumberCore.assertFloat(undefined)).to.throw(TypeError, 'Invalid value: expected a Float, got [undefined]');
			expect(() => NumberCore.assertFloat('test')).to.throw(TypeError, 'Invalid value: expected a Float, got "test" [string]');
			expect(() => NumberCore.assertFloat({} as any)).to.throw(TypeError, 'Invalid value: expected a Float, got {} [object]');
			expect(() => NumberCore.assertFloat(NaN)).to.throw(TypeError, 'Invalid value: expected a Float, got NaN [number]');
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
			expect(() => NumberCore.bigIntFrom(null)).to.throw(TypeError, 'Invalid value: expected a BigInt, got null [object]');
			expect(() => NumberCore.bigIntFrom(undefined)).to.throw(TypeError, 'Invalid value: expected a BigInt, got [undefined]');
			expect(() => NumberCore.bigIntFrom('test')).to.throw(TypeError, 'Invalid value: expected a BigInt, got "test" [string]');
			expect(() => NumberCore.bigIntFrom({} as any)).to.throw(TypeError, 'Invalid value: expected a BigInt, got {} [object]');
		});
		it('it should assert', function () {
			expect(() => NumberCore.assertBigInt(null)).to.throw(TypeError, 'Invalid value: expected a BigInt, got null [object]');
			expect(() => NumberCore.assertBigInt(undefined)).to.throw(TypeError, 'Invalid value: expected a BigInt, got [undefined]');
			expect(() => NumberCore.assertBigInt('test')).to.throw(TypeError, 'Invalid value: expected a BigInt, got "test" [string]');
			expect(() => NumberCore.assertBigInt({} as any)).to.throw(TypeError, 'Invalid value: expected a BigInt, got {} [object]');
			expect(() => NumberCore.assertBigInt(NaN)).to.throw(TypeError, 'Invalid value: expected a BigInt, got NaN [number]');
		});
	});
});
