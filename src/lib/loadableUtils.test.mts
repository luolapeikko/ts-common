import {describe, expect, it} from 'vitest';
import {type Loadable} from '../types/Loadable.mjs';
import {resolveLoadable} from './loadableUtils.mjs';

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
