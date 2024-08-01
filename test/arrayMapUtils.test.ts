/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import {arrayMap, type NonEmptyArray} from '../src';

const looseValue: Record<'value', string> = {
	value: 'value',
};

const innerConst = [{value: 'value'} as const];
const neverDataArray: Array<{value: string}> = [];

describe('objectUtils', function () {
	describe('objectKeys', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyArray<'value'> = arrayMap([{value: 'value'}] as const, (value) => value.value);
			const _constValueData: NonEmptyArray<string> = arrayMap([looseValue] as const, (value) => value.value);
			const _baseData: Array<'value'> = arrayMap(innerConst, (value) => value.value);
			const _neverData: Array<string> = arrayMap(neverDataArray, (value) => value.value);
		});
	});
});
