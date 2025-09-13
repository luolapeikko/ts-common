import {describe, expect, it} from 'vitest';
import {RecordPredicate as R} from './RecordPredicate.mjs';

type User = {
	id: number;
	name: string;
	role: 'admin' | 'user';
	active?: boolean;
};
const user1: User = {id: 1, name: 'Alice', role: 'admin', active: true};
const user2: User = {id: 2, name: 'Bob', role: 'user'};
const users: User[] = [user1, user2, {id: 3, name: 'Carol', role: 'user', active: false}];

describe('recordUtils', function () {
	describe('onKeyEqual', () => {
		it('returns a predicate function', () => {
			const predicate = R.propEq('role', 'admin');
			expect(typeof predicate).toBe('function');
		});

		it('correctly filters matching values', () => {
			const isAdmin = R.propEq('role', 'admin');
			const result = users.filter(isAdmin);
			expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
		});

		it('handles optional properties', () => {
			const isActive = R.propEq('active', true);
			const result = users.filter(isActive);
			expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
		});

		it('returns an empty array when no match is found', () => {
			const hasNameDave = R.propEq('name', 'Dave');
			const result = users.filter(hasNameDave);
			expect(result).toEqual([]);
		});

		it('works with loosely typed records', () => {
			const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
			const isX = R.propEq('type', 'x');
			const result = objects.filter(isX);
			expect(result).toEqual([{type: 'x'}]);
		});
	});

	describe('propNotEquals', () => {
		it('returns a predicate function', () => {
			const predicate = R.propNotEq('role', 'admin');
			expect(typeof predicate).toBe('function');
		});

		it('correctly filters objects where the property does not match', () => {
			const isNotAdmin = R.propNotEq('role', 'admin');
			const result = users.filter(isNotAdmin);
			expect(result).toEqual([
				{id: 2, name: 'Bob', role: 'user'},
				{id: 3, name: 'Carol', role: 'user', active: false},
			]);
		});

		it('handles optional properties', () => {
			const isNotActive = R.propNotEq('active', true);
			const result = users.filter(isNotActive);
			expect(result).toEqual([
				{id: 2, name: 'Bob', role: 'user'},
				{id: 3, name: 'Carol', role: 'user', active: false},
			]);
		});

		it('returns all objects when no property matches the value', () => {
			const notNamedDave = R.propNotEq('name', 'Dave');
			const result = users.filter(notNamedDave);
			expect(result).toEqual(users);
		});

		it('works with loosely typed records', () => {
			const objects: Partial<Record<'type', string>>[] = [{type: 'x'}, {}, {type: 'y'}];
			const isNotX = R.propNotEq('type', 'x');
			const result = objects.filter(isNotX);
			expect(result).toEqual([{}, {type: 'y'}]);
		});
	});
});
