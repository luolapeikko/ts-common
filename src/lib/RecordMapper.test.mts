import {describe, expect, it} from 'vitest';
import {RecordMapper} from './RecordMapper.mjs';

type User = {
	id: number;
	name: string;
	role: 'admin' | 'user';
	active?: boolean;
};
const user1: User = {id: 1, name: 'Alice', role: 'admin', active: true};
const user2: User = {id: 2, name: 'Bob', role: 'user'};
const users: User[] = [user1, user2, {id: 3, name: 'Carol', role: 'user', active: false}];

describe('Test RecordMapper functions', function () {
	describe('RecordMapper.prop', () => {
		it('returns a function that extracts a property from an object', () => {
			const getName = RecordMapper.prop('name');
			expect(getName(user1)).toBe('Alice');
			expect(getName(user2)).toBe('Bob');
		});

		it('can be used with Array.map', () => {
			const getId = RecordMapper.prop('id');
			const ids = users.map(getId);
			expect(ids).toEqual([1, 2, 3]);
		});

		it('works with arrays as target (index access)', () => {
			const getFirst = RecordMapper.prop(0);
			expect(getFirst(['a', 'b', 'c'])).toBe('a');
			const getSecond = RecordMapper.prop(1);
			expect(getSecond(['x', 'y', 'z'])).toBe('y');
		});
	});
	describe('RecordMapper.omit', function () {
		it('should omit from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(RecordMapper.omit(['value']))).to.eql([{demo: 'hello'}]);
			expect(data.map(RecordMapper.omit(['demo']))).to.eql([{value: null}]);
		});
	});
	describe('RecordMapper.pick', function () {
		it('should pick from map', function () {
			const data = [{demo: 'hello', value: null}];
			expect(data.map(RecordMapper.pick(['value']))).to.eql([{value: null}]);
			expect(data.map(RecordMapper.pick(['demo']))).to.eql([{demo: 'hello'}]);
		});
	});
});
