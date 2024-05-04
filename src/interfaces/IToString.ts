/**
 * Interface for objects that can be converted to a string.
 * @example
 * import type {IToString} from '@luolapeikko/ts-common';
 * class MyClass implements IToString {}
 */
export interface IToString {
	toString(): string;
}
