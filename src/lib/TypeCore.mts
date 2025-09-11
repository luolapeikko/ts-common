export class TypeCore {
	public static isPrimitive(value: unknown): value is string | number | boolean | bigint;
	public static isPrimitive<T>(value: T): value is Extract<T, string | number | boolean | bigint>;
	public static isPrimitive(value: unknown): value is string | number | boolean | bigint {
		switch (typeof value) {
			case 'string':
			case 'number':
			case 'boolean':
			case 'bigint':
				return true;
			default:
				return false;
		}
	}

	public static isNotPrimitive<T>(value: T): value is Exclude<T, string | number | boolean | bigint> {
		return !TypeCore.isPrimitive<T>(value);
	}
}
