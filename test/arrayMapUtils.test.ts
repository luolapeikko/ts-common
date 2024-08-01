/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import {arrayMap, type NonEmptyArray} from '../src';

const looseValue: Record<'value', string> = {
	value: 'value',
};

const constDataArray = [{value: 'value'}] as const;
const constDataArrayLoose = [looseValue] as const;
const baseDataArray = [{value: 'value'}];
const neverDataArray: Array<{value: string}> = [];

describe('objectUtils', function () {
	describe('objectKeys', function () {
		it('should have valid types', function () {
			const _constData: NonEmptyArray<'value'> = arrayMap(constDataArray, (value) => value.value);
			const _constValueData: NonEmptyArray<string> = arrayMap(constDataArrayLoose, (value) => value.value);
			const _baseData: Array<string> = arrayMap(baseDataArray, (value) => value.value);
			const _neverData: Array<string> = arrayMap(neverDataArray, (value) => value.value);
		});
	});
});
