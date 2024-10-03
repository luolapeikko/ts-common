import {type IfReadonlyKeys, type IfWritableKeys} from './helper.mjs';

/**
 * Check if a record is readonly or never
 * @since v0.1.2
 */
export type RecordHaveReadonlyKeys<R extends Record<string | number | symbol, unknown>> = IfReadonlyKeys<R> extends never ? never : R;

/**
 * Check if a record is non-readonly or never
 * @since v0.1.2
 */
export type RecordHaveWritableKeys<R extends Record<string | number | symbol, unknown>> = IfWritableKeys<R> extends never ? never : R;
