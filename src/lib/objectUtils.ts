import {type NonEmpty} from '../types/NonEmpty';
import {type NonEmptyArray} from '../types/NonEmptyArray';

/**
 * Type-safe Object.entries() with overload for NonEmptyArray
 */
export function objectEntries<Key extends string, Value>(value: NonEmpty<Record<Key, Value>>): NonEmptyArray<[Key, Value]>;
export function objectEntries<Key extends string, Value>(value: Record<Key, Value>): Array<[Key, Value]>;
export function objectEntries<Key extends string, Value>(value: Record<Key, Value>): Array<[Key, Value]> {
	return Object.entries(value) as Array<[Key, Value]>;
}

/**
 * Type-safe Object.keys() with overload for NonEmptyArray
 */
export function objectKeys<Key extends string, Value>(value: NonEmpty<Record<Key, Value>>): NonEmptyArray<Key>;
export function objectKeys<Key extends string, Value>(value: Record<Key, Value>): Array<Key>;
export function objectKeys<Key extends string, Value>(value: Record<Key, Value>): Array<Key> {
	return Object.keys(value) as Array<Key>;
}

/**
 * Type-safe Object.values() with overload for NonEmptyArray
 */
export function objectValues<Key extends string, Value>(value: NonEmpty<Record<Key, Value>>): NonEmptyArray<Value>;
export function objectValues<Key extends string, Value>(value: Record<Key, Value>): Array<Value>;
export function objectValues<Key extends string, Value>(value: Record<Key, Value>): Array<Value> {
	return Object.values(value);
}
