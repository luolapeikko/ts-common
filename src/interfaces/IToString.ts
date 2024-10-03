/**
 * Interface for objects that can be converted to a string.
 * @example
 * import type {IToString} from '@luolapeikko/ts-common';
 * class MyClass implements IToString {}
 * @version 0.0.1
 */
export interface IToString {
	toString(): string;
}
