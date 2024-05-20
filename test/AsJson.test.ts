import 'mocha';
import {Equal, Expect} from 'type-testing';
import {AsJson} from '../src/';

describe('Test AsJson', function () {
	it('should have valid types', function () {
		type _Test1 = Expect<Equal<AsJson<string>, string>>;
		type _Test2 = Expect<Equal<AsJson<{test: string}>, {test: string}>>;
		type _Test3 = Expect<Equal<AsJson<{test: () => ''}>, {test: never}>>;
		type _Test4 = Expect<Equal<AsJson<{test: undefined}>, {test: undefined}>>;
		type _Test5 = Expect<Equal<AsJson<{test: null}>, {test: null}>>;
	});
});
