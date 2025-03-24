/**
 * Can be used to ensure that an object is not empty object.
 * @since v0.1.0
 * @template T The type of the object
 */
export type NonEmpty<T> = keyof T extends never ? never : T;
