import type {AsJson} from '../types/AsJson.js';

/**
 * Interface for classes that can be converted to JSON.
 * @version 0.1.0
 * @example
 * import type {IToJSON} from '@luolapeikko/ts-common';
 * class MyClass implements IToJSON<{name: string}> {}
 */
export interface IToJSON<JsonOutput> {
	toJSON(): AsJson<JsonOutput>;
}
