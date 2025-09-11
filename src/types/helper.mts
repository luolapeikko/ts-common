/**
 * Support for conditional types
 * @template X Object type
 * @template Y Object type
 * @template A Output object type or never
 * @template B Output object type or never
 * @since v0.1.2
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/**
 * @template T The object shape
 * @since v0.1.2
 */
export type IfWritableKeys<T> = {
	[P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly [Q in P]: T[P]}, P>;
}[keyof T];

/**
 * @template T The object shape
 * @since v0.1.2
 */
export type IfReadonlyKeys<T> = {
	[P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly [Q in P]: T[P]}, never, P>;
}[keyof T];

export type NonBaseType<T, Base, Strict extends Base> = Exclude<Extract<T, Base>, Strict>;
