import type {MappingShape} from './mapper.mjs';
import type {Nullish} from './Nullish.mjs';

export type WithIsPositiveCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `is${Key}` : never]: <R>(value: R) => value is Extract<R, T[Key][1]>;
};

export type WithIsNegativeCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `isNot${Key}` : never]: <R>(value: R) => value is Exclude<R, T[Key][1]>;
};

export type WithIsCore<T extends MappingShape> = WithIsPositiveCore<T> & WithIsNegativeCore<T>;

export type WithAssertPositiveCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `assert${Key}` : never]: (value: unknown, message?: string) => asserts value is T[Key][1];
};

export type WithAssertNegativeCore<T extends MappingShape> = {
	[Key in keyof T as Key extends string ? `assertNot${Key}` : never]: <R>(value: R, message?: string) => asserts value is Exclude<R, T[Key][1]>;
};

export type WithAssertCore<T extends MappingShape> = WithAssertPositiveCore<T> & WithAssertNegativeCore<T>;

export type WithFromCore<T extends MappingShape> = {
	[Key in keyof T as Key extends '' ? `from` : Key extends string ? `${Uncapitalize<Key>}From` : never]: (value: Nullish<T[Key][0]>) => T[Key][1];
};

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type Guard<T, Base> = Extract<T extends unknown ? unknown | Base : T, Base>;
