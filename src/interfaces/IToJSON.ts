/**
 * Interface for classes that can be converted to JSON.
 * @example
 * import type {IToJSON} from '@luolapeikko/ts-common';
 * class MyClass implements IToJSON {}
 */
export interface IToJSON {
	toJSON(): string;
}
