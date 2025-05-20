/**
 * Prettifies a type.
 * @template T The type to prettify.
 * @since v0.3.8
 * @example
 * type Prettified = Prettify<{ a: string; } & { b: number; } & { c: boolean; }> // { a: string; b: number; c: boolean; }
 */
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
