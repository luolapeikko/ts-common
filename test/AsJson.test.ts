/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import 'mocha';
import {type Equal, type Expect} from 'type-testing';
import {type AsJson} from '../src/index.js';

describe('Test AsJson', function () {
	it('should have valid types', function () {
		type _Test1 = Expect<Equal<AsJson<string>, string>>;
		type _Test2 = Expect<Equal<AsJson<{test: string}>, {test: string}>>;
		type _Test3 = Expect<Equal<AsJson<{test: () => ''}>, {test: never}>>;
		type _Test4 = Expect<Equal<AsJson<{test: undefined}>, {test: undefined}>>;
		type _Test5 = Expect<Equal<AsJson<{test: null}>, {test: null}>>;
	});
});
