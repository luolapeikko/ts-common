import {describe, expect, it} from 'vitest';
import {type Loadable, resolveLoadable} from '../src/index.mjs';

describe('loadableUtils', function () {
	describe('resolveLoadable', function () {
		it('should handle loadable resolve', async function () {
			expect(await resolveLoadable<Loadable<string>>('test')).to.equal('test');
			expect(await resolveLoadable<Loadable<string>>(Promise.resolve('test'))).to.equal('test');
			expect(await resolveLoadable<Loadable<string>>(() => 'test')).to.equal('test');
			expect(await resolveLoadable<Loadable<string>>(() => Promise.resolve('test'))).to.equal('test');
		});
	});
});
