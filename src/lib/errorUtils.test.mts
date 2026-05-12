import {describe, expect, it} from 'vitest';
import {setCustomErrorStringFunction} from './errorUtils.mjs';
import {StringCore} from './StringCore.mjs';

describe('loadableUtils', function () {
	describe('resolveLoadable', function () {
		it('should handle loadable resolve', function () {
			setCustomErrorStringFunction(() => 'test');
			expect(StringCore.buildValueErr(null, 'String').message).to.eql('test');
		});
		it('should handle loadable resolve', function () {
			setCustomErrorStringFunction(undefined);
			expect(StringCore.buildValueErr(null, 'String').message).to.eql('Invalid value: expected a String, got null [object]');
		});
	});
});
