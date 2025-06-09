import {assertType, describe, expect, it} from 'vitest';
import {prop, propEquals, propNotEquals} from './propUtils.mjs';

describe('Test propUtils types', () => {
	type User = {
		id: number;
		name: string;
		role: 'admin' | 'user';
		active?: boolean;
	};
	const user1: User = {id: 1, name: 'Alice', role: 'admin'};
	const user2: User = {id: 2, name: 'Bob', role: 'user'};
	const users: User[] = [user1, user2];
	describe('Test prop types', () => {
		it('infers types strictly with generic <T, K>', () => {
			const getRole = prop<User, 'role'>('role');
			assertType<(target: User) => 'admin' | 'user'>(getRole);
			const user = users[0];
			if (!user) {
				return;
			}
			expect(getRole(user)).toBe('admin');
		});

		it('infers key type correctly in curried generic version', () => {
			const getId = prop('id');
			assertType<(target: {id: number}) => number>(getId);

			const getLength = prop('length');
			assertType<(target: any[]) => number>(getLength);
		});

		it('produces type errors for invalid keys', () => {
			// @ts-expect-error 'nonexistent' is not a key of User
			const getMissing = prop<User, 'nonexistent'>('nonexistent');

			// @ts-expect-error invalid key for array
			const getFoo = prop('foo')(['a', 'b']);
		});
	});

	it('Test propEquals types', () => {
		const fn = propEquals<User, 'role'>('role', 'user');
		assertType<(obj: User) => boolean>(fn);
		const looseFn = propEquals('active', true);
		assertType<(obj: {active?: boolean}) => boolean>(looseFn);
	});

	it('Test propNotEquals types', () => {
		const fn = propNotEquals<User, 'role'>('role', 'user');
		assertType<(obj: User) => boolean>(fn);
		const looseFn = propNotEquals('active', true);
		assertType<(obj: {active?: boolean}) => boolean>(looseFn);
	});
});
