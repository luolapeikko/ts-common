import {assertType, describe, it} from 'vitest';
import {RecordPredicate as R} from './RecordPredicate.mjs';

type User = {
	id: number;
	name: string;
	role: 'admin' | 'user';
	active?: boolean;
};

describe('object Key filtering', function () {
	describe('Test propEq types', () => {
		it('should be correct propEq types', () => {
			const fn = R.propEq<User, 'role'>('role', 'user');
			assertType<(obj: User) => boolean>(fn);
			const looseFn = R.propEq('active', true);
			assertType<(obj: {active?: boolean}) => boolean>(looseFn);
		});
	});
	describe('Test propNotEq types', () => {
		it('should be correct propNotEq types', () => {
			const fn = R.propNotEq<User, 'role'>('role', 'user');
			assertType<(obj: User) => boolean>(fn);
			const looseFn = R.propNotEq('active', true);
			assertType<(obj: {active?: boolean}) => boolean>(looseFn);
		});
	});
});
