import {assertType, describe, it} from 'vitest';
import {type OneOf} from '../src/index.mjs';

type Demo1 = {demo1: string};
type Demo2 = {demo2: string};

const validObject = {
	demo1: 'test',
};

const invalidObject = {
	demo1: 'test',
	demo2: 'test',
};

describe('Test OneOf', function () {
	it('should assert valid types', function () {
		assertType<Demo1 | Demo2>(validObject);
		assertType<OneOf<[Demo1, Demo2]>>(validObject);
	});
	it('should assert invalid types', function () {
		assertType<Demo1 | Demo2>(invalidObject);
		// @ts-expect-error Type 'string' is not assignable to type 'undefined'
		assertType<OneOf<[Demo1, Demo2]>>(invalidObject);
	});
});
