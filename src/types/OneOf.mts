/**
 * from https://github.com/typed-rocks/typescript/blob/main/one_of.ts
 */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MergeTypes<TypesArray extends any[], Res = {}> = TypesArray extends [infer Head, ...infer Rem] ? MergeTypes<Rem, Res & Head> : Res;

type OnlyFirst<F, S> = F & {[Key in keyof Omit<S, keyof F>]?: never};

/**
 * OneOf type to handle one of types (non-union way as union combines type).
 * @example
 * function test(data: OneOf<[{data1: string}, {data2: string}]>) {
 * }
 * @since v0.2.6
 */
export type OneOf<TypesArray extends any[], Res = never, AllProperties = MergeTypes<TypesArray>> = TypesArray extends [infer Head, ...infer Rem]
	? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
	: Res;
