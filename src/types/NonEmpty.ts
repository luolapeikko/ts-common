/**
 * Can be used to ensure that an object is not empty object.
 * @version 0.1.0
 */
export type NonEmpty<T> = keyof T extends never ? never : T;
