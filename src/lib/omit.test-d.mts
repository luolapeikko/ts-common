import {assertType, describe, it} from 'vitest';
import {omit} from './omit.mjs';

type Data = {demo: string; value: number | null};

describe('Test omit types', function () {
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
});
