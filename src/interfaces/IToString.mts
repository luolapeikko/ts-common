/**
 * Interface for objects that can be converted to a string.
 * @example
 * class MyClass implements IToString {}
 * @template T The type of the string
 * @since v0.0.1
 */
export interface IToString<T extends string = string> {
	toString(): T;
}
