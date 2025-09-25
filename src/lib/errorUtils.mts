import {type ErrorBuildFunc} from '../types/ErrorBuildFunc.mjs';
import {StringCore} from './StringCore.mjs';

function getStringValue(value: unknown): string | undefined {
	switch (typeof value) {
		case 'bigint':
			return value.toString();
		case 'function':
		case 'symbol':
			return undefined;
		case 'number':
			return isNaN(value) ? 'NaN' : JSON.stringify(value);
		default:
			return JSON.stringify(value);
	}
}

/**
 * Default error message builder.
 * @param {string | undefined} value - The invalid value.
 * @param {string} typeName - The expected type name.
 * @param {boolean} isNot - Whether the error should be for `!${typeName}`.
 * @returns {string} The error message.
 */
function errorValueBuilder(value: unknown, typeName: string, isNot: boolean): string {
	const strValue = getStringValue(value);
	const gotString = strValue === undefined ? `got [${typeof value}]` : `got ${strValue} [${typeof value}]`;
	const expectedString = `expected ${isNot ? 'not ' : ''}${StringCore.getArticle(typeName)} ${typeName}`;
	return errorPrefixBuilder(`${expectedString}, ${gotString}`);
}

export function errorMessageBuilder(typeName: string, message: string): string {
	return errorPrefixBuilder(`${typeName} error, ${message}`);
}

let errorBuilderInstance: ErrorBuildFunc = errorValueBuilder;
export function setCustomErrorStringFunction(customErrorFunction: ErrorBuildFunc | undefined): void {
	errorBuilderInstance = customErrorFunction ?? errorValueBuilder;
}

export function valueErrorBuilder(value: unknown, typeName: string, isNot: boolean): TypeError {
	return new TypeError(errorBuilderInstance(value, typeName, isNot));
}

export function errorPrefixBuilder(message: string) {
	return `Invalid value: ${message}`;
}
