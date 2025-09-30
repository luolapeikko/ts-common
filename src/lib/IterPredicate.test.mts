import {describe, expect, it} from 'vitest';
import {IterPredicate} from './IterPredicate.mjs';

describe('IterPredicate', function () {
	it('should filter oneOf and notOneOf', function () {
		const values = ['a', 'b', 'c'] as const;
		expect(values.filter(IterPredicate.oneOf('a'))).to.eql(['a']);
		// @ts-expect-error Argument of type '"ä"' is not assignable to parameter of type '"a" | "b" | "c"'.
		expect(values.filter(IterPredicate.notOneOf('ä'))).to.eql(['a', 'b', 'c']);
		expect(values.filter(IterPredicate.notOneOf<string>('ä'))).to.eql(['a', 'b', 'c']);
	});
});
