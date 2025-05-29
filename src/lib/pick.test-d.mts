import {assertType, describe, it} from 'vitest';
import {pick} from './pick.mjs';

type Data = {demo: string; value: number | null};

describe('Test pick types', function () {
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
});
