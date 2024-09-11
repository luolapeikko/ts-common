/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import {type Loadable, resolveLoadable} from '../src/index.js';
import {expect} from 'chai';

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
