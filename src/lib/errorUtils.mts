export function errorBuilder(value: unknown, typeName: string): TypeError {
	switch (typeof value) {
		case 'number':
			return new TypeError(`${errorPrefixBuilder(typeName)}: ${value} [Number]`);
		case 'boolean':
			return new TypeError(`${errorPrefixBuilder(typeName)}: ${value} [Boolean]`);
		case 'bigint':
			return new TypeError(`${errorPrefixBuilder(typeName)}: ${value} [BigInt]`);
		case 'function':
			return new TypeError(`${errorPrefixBuilder(typeName)}: [Function]`);
		case 'symbol':
			return new TypeError(`${errorPrefixBuilder(typeName)}: [Symbol]`);
		default:
			return new TypeError(`${errorPrefixBuilder(typeName)}: ${JSON.stringify(value)}`);
	}
}

export function errorPrefixBuilder(typeName: string): string {
	return `Invalid ${typeName} value`;
}
