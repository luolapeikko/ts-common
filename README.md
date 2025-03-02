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
- Object replacement functions like `objectEntries`, `objectKeys`, `objectValues` and `objectMap` to handle better return types.
- Error utils like `toError(value: unknown): Error | UnknownError`, `errorAs(err, TypeError): TypeError` or `errorWith(err, (msg) => new TypeError(msg)): TypeError`
- Helper interfaces like `IToString`, `IToJSON`.

See more features on [Package documentation](https://luolapeikko.github.io/ts-common/)
