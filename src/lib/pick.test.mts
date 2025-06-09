import {describe, expect, it} from 'vitest';
import {pick} from './pick.mjs';

describe('pick', function () {
	describe('pick from object', function () {
		it('should pick value', function () {
			const data = {demo: 'hello', value: null};
			expect(pick(['value'], data)).to.eql({value: null});
			expect(pick(['demo'], data)).to.eql({demo: 'hello'});
			expect(() => pick(['demo'], null as any)).to.throw(TypeError, 'The second argument must be an object.');
		});
		it('should pick from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(pick(['value']))).to.eql([{value: null}]);
			expect(data.map(pick(['demo']))).to.eql([{demo: 'hello'}]);
		});
	});
});
