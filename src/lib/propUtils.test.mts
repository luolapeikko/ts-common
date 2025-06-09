import {describe, expect, it} from 'vitest';
import {prop, propEquals, propNotEquals} from './propUtils.mjs';

describe('propUtils', () => {
	type User = {
		id: number;
		name: string;
		role: 'admin' | 'user';
		active?: boolean;
	};
	const user1: User = {id: 1, name: 'Alice', role: 'admin', active: true};
	const user2: User = {id: 2, name: 'Bob', role: 'user'};
	const users: User[] = [user1, user2, {id: 3, name: 'Carol', role: 'user', active: false}];
	describe('prop', () => {
		it('returns a function that extracts a property from an object', () => {
			const getName = prop('name');
			expect(getName(user1)).toBe('Alice');
			expect(getName(user2)).toBe('Bob');
		});

		it('can be used with Array.map', () => {
			const getId = prop('id');
			const ids = users.map(getId);
			expect(ids).toEqual([1, 2, 3]);
		});

		it('works with arrays as target (index access)', () => {
			const getFirst = prop(0);
			expect(getFirst(['a', 'b', 'c'])).toBe('a');
			const getSecond = prop(1);
			expect(getSecond(['x', 'y', 'z'])).toBe('y');
		});
	});
	describe('propEquals & propNotEquals', () => {
		describe('propEquals', () => {
			it('returns a predicate function', () => {
				const predicate = propEquals('role', 'admin');
				expect(typeof predicate).toBe('function');
			});

			it('correctly filters matching values', () => {
				const isAdmin = propEquals('role', 'admin');
				const result = users.filter(isAdmin);
				expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
			});

			it('handles optional properties', () => {
				const isActive = propEquals('active', true);
				const result = users.filter(isActive);
				expect(result).toEqual([{id: 1, name: 'Alice', role: 'admin', active: true}]);
			});

			it('returns an empty array when no match is found', () => {
				const hasNameDave = propEquals('name', 'Dave');
				const result = users.filter(hasNameDave);
				expect(result).toEqual([]);
			});

			it('works with loosely typed records', () => {
				const objects: Array<Partial<Record<'type', string>>> = [{type: 'x'}, {}, {type: 'y'}];
				const isX = propEquals('type', 'x');
				const result = objects.filter(isX);
				expect(result).toEqual([{type: 'x'}]);
			});
		});

		describe('propNotEquals', () => {
			it('returns a predicate function', () => {
				const predicate = propNotEquals('role', 'admin');
				expect(typeof predicate).toBe('function');
			});

			it('correctly filters objects where the property does not match', () => {
				const isNotAdmin = propNotEquals('role', 'admin');
				const result = users.filter(isNotAdmin);
				expect(result).toEqual([
					{id: 2, name: 'Bob', role: 'user'},
					{id: 3, name: 'Carol', role: 'user', active: false},
				]);
			});

			it('handles optional properties', () => {
				const isNotActive = propNotEquals('active', true);
				const result = users.filter(isNotActive);
				expect(result).toEqual([
					{id: 2, name: 'Bob', role: 'user'},
					{id: 3, name: 'Carol', role: 'user', active: false},
				]);
			});

			it('returns all objects when no property matches the value', () => {
				const notNamedDave = propNotEquals('name', 'Dave');
				const result = users.filter(notNamedDave);
				expect(result).toEqual(users);
			});

			it('works with loosely typed records', () => {
				const objects: Array<Partial<Record<'type', string>>> = [{type: 'x'}, {}, {type: 'y'}];
				const isNotX = propNotEquals('type', 'x');
				const result = objects.filter(isNotX);
				expect(result).toEqual([{}, {type: 'y'}]);
			});
		});
	});
});
