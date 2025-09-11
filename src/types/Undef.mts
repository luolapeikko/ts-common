/**
 * Value can be T or undefined.
 * @template T The type of the value
 * @example
 * function demo(value: Undef<string>) {
 *   // value: string | undefined
 * }
 * @since v0.4.0
 */
export type Undef<T> = T | undefined;

/**
 * Mapping type for "is" and "isNot" method names and return types for Core and Predicate classes.
 */
export type UndefFnMapping = {
	Undefined: [undefined, undefined];
	Null: [null, null];
	Nullish: [null | undefined, null | undefined];
};
