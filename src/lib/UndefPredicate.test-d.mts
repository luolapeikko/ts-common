import {assertType, describe, it} from 'vitest';
import {UndefPredicate as U} from './UndefPredicate.mjs';

describe('Test StringPredicate functions', function () {
	describe('Type tests', function () {
		it('isNull', function () {
			assertType<null[]>(['test', null].filter(U.isNull()));
			assertType<null[]>(['test', null].filter(U.isNull<string | null>()));
			// @ts-expect-error Type 'string | null' is not assignable to type 'null'.
			assertType<null[]>(['test', null].filter(U.isNull<null>()));
		});
		it('isNotNull', function () {
			assertType<string[]>(['test', null].filter(U.isNotNull()));
			assertType<string[]>(['test', null].filter(U.isNotNull<string | null>()));
			// @ts-expect-error Type 'string | null' is not assignable to type 'null'.
			assertType<string[]>(['test', null].filter(U.isNotNull<null>()));
		});
		it('isUndefined', function () {
			assertType<undefined[]>(['test', undefined].filter(U.isUndefined()));
			assertType<undefined[]>(['test', undefined].filter(U.isUndefined<string | undefined>()));
			// @ts-expect-error Type 'string | undefined' is not assignable to type 'undefined'.
			assertType<undefined[]>(['test', undefined].filter(U.isUndefined<undefined>()));
		});
		it('isNotUndefined', function () {
			assertType<string[]>(['test', undefined].filter(U.isNotUndefined()));
			assertType<string[]>(['test', undefined].filter(U.isNotUndefined<string | undefined>()));
			// @ts-expect-error Type 'string | undefined' is not assignable to type 'undefined'.
			assertType<string[]>(['test', undefined].filter(U.isNotUndefined<undefined>()));
		});
		it('isNullish', function () {
			assertType<(string | null | undefined)[]>(['test', null, undefined].filter(U.isNullish()));
			assertType<(string | null | undefined)[]>(['test', null, undefined].filter(U.isNullish<string | null | undefined>()));
			// @ts-expect-error Type 'string | null | undefined' is not assignable to type 'null | undefined'.
			assertType<(string | null | undefined)[]>(['test', null, undefined].filter(U.isNullish<null | undefined>()));
		});
		it('isNotNullish', function () {
			assertType<(string | null | undefined)[]>(['test', null, undefined].filter(U.isNotNullish()));
			assertType<(string | null | undefined)[]>(['test', null, undefined].filter(U.isNotNullish<string | null | undefined>()));
			// @ts-expect-error Type 'string | null | undefined' is not assignable to type 'null | undefined'.
			assertType<(string | null | undefined)[]>(['test', null, undefined].filter(U.isNotNullish<null | undefined>()));
		});
	});
});
