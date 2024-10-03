/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

/**
 * @version 0.1.2
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/**
 * @version 0.1.2
 */
export type IfWritableKeys<T> = {
	[P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly [Q in P]: T[P]}, P>;
}[keyof T];

/**
 * @version 0.1.2
 */
export type IfReadonlyKeys<T> = {
	[P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly [Q in P]: T[P]}, never, P>;
}[keyof T];
