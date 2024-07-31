/**
 * Can be used to ensure that an object is not empty object.
 */
export type NonEmpty<T> = keyof T extends never ? never : T;
