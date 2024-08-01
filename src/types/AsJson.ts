/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/**
 * JSON serializable types.
 * @template Input - Input type.
 * @template CustomTypes - Custom types to be included in the JSON payload. (Buffer, etc.)
 */
export type AsJson<Input, CustomTypes = never> = Input extends string | bigint | number | boolean | null | undefined | CustomTypes
	? Input
	: Input extends Function
		? never
		: Input extends object
			? {[K in keyof Input]: AsJson<Input[K]>}
			: never;
