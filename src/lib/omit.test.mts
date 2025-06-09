import {describe, expect, it} from 'vitest';
import {omit} from './omit.mjs';

describe('omit', function () {
	describe('omit from object', function () {
		it('should omit value', function () {
			const data = {demo: 'hello', value: null};
			expect(omit(['value'], data)).to.eql({demo: 'hello'});
			expect(omit(['demo'], data)).to.eql({value: null});
		});
		it('should omit from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(omit(['value']))).to.eql([{demo: 'hello'}]);
			expect(data.map(omit(['demo']))).to.eql([{value: null}]);
		});
	});
});
