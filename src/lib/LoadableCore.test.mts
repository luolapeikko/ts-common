import {describe, expect, it} from 'vitest';
import {type Loadable} from '../types/Loadable.mjs';
import {LoadableCore as L} from './LoadableCore.mjs';

describe('loadableUtils', function () {
	describe('resolveLoadable', function () {
		it('should handle loadable resolve', async function () {
			expect(await L.resolve<Loadable<string>>('test')).to.equal('test');
			expect(await L.resolve<Loadable<string>>(Promise.resolve('test'))).to.equal('test');
			expect(await L.resolve<Loadable<string>>(() => 'test')).to.equal('test');
			expect(await L.resolve<Loadable<string>>(() => Promise.resolve('test'))).to.equal('test');
		});
	});
});
