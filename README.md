# ts-common

Collection of common TS utility types, interfaces and utils.

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/@luolapeikko%2Fts-common.svg)](https://badge.fury.io/js/@luolapeikko%2Fts-common)
![github action](https://github.com/luolapeikko/ts-common/actions/workflows/main.yml/badge.svg?branch=main)

## Install

```bash
npm install @luolapeikko/ts-common
```

### Documentation

- `Loadable` type to handle loadable value (e.g. value, value Promise, callback function returning value).
- Array utility types like `NonEmptyArray` and `NonEmptyReadonlyArray`.
- Object utility conditional types like `RecordHaveReadonlyKeys` and `RecordHaveWritableKeys`.
- `OneOf` type to handle one of types (non-union way).
- Helper interfaces like `IToString`, `IToJSON`.
- new Core helper class namespaced functions under [`ArrayCore`, `ErrorCore`, `IterCore`, `LoadableCore`, `NumberCore`, `RecordCore`, `UndefCore`] for easier access.

### "Core" function usage examples

```typescript
import {NumberCore as N} from '@luolapeikko/ts-common';
N.isInteger(1); // true
N.isFloat(1); // false

import {RecordCore as R} from '@luolapeikko/ts-common';
const data: Data = {demo: 'hello', value: null};
const output: Pick<Data, 'value'> = R.pick(['value'], data);
const dataArray: Data[] = [{demo: 'hello', value: null}];
const output: Pick<Data, 'demo'>[] = dataArray.map(R.pick(['demo']));

import {UndefCore as U} from '@luolapeikko/ts-common';
U.isUndef(null); // true
U.isNull(null); // true
U.isNullish(null); // true
U.assertNull('test'); // throws
```

See more features on [Package documentation](https://luolapeikko.github.io/ts-common/)
