import type {AsJson} from '../types/AsJson.mjs';

/**
 * Interface for classes that can be converted to JSON.
 * @example
 * class MyClass implements IToJSON<{name: string}> {}
 * @template JsonOutput The type of the JSON output from class method or function
 * @since v0.1.0
 */
export interface IToJSON<JsonOutput> {
	toJSON(): AsJson<JsonOutput>;
}
