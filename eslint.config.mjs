import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import tsParser from '@typescript-eslint/parser';

/**
 * install
 * pnpm i -D @eslint/js typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import @stylistic/eslint-plugin @stylistic/eslint-plugin-ts eslint-plugin-prettier eslint-plugin-sonarjs @cspell/eslint-plugin
 *
 */

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	sonarjs.configs.recommended,
	prettierRecommended,
	{
		ignores: ['**/dist', '**/node_modules', '**/.github', '**/.nyc_output', '**/vite.config.mts', 'eslint.config.mjs'],
	},
	{
		plugins: {
			'@stylistic/ts': stylistic,
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.test.json',
			},
		},
		settings: {
			'import/resolver': {
				typescript: {
					extensions: ['.mts'],
					moduleDirectory: ['node_modules', 'src/'],
				},
			},
		},
		rules: {
			'sort-imports': 'off',
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					named: true,
					'newlines-between': 'never',
				},
			],
			'import/no-useless-path-segments': 'warn',
			'import/no-duplicates': 'error',
			curly: 'error',
			camelcase: 1,
			'@typescript-eslint/no-this-alias': [
				'warn',
				{
					allowedNames: ['self'],
				},
			],
			'sort-keys': [
				'warn',
				'asc',
				{
					caseSensitive: false,
					natural: true,
					minKeys: 5,
				},
			],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-deprecated': 'warn',
			'lines-between-class-members': 'off',
			'@stylistic/ts/lines-between-class-members': [
				'warn',
				'always',
				{
					exceptAfterOverload: true,
					exceptAfterSingleLine: true,
				},
			],
			'@typescript-eslint/consistent-type-imports': ['warn', {prefer: 'type-imports', fixStyle: 'inline-type-imports'}],
			'@typescript-eslint/member-ordering': [
				'warn',
				{
					classes: [
						'public-abstract-field',
						'protected-abstract-field',
						'static-field',
						'static-method',
						'field',
						'constructor',
						'public-method',
						'protected-method',
						'private-method',
						'#private-method',
						'public-abstract-method',
						'protected-abstract-method',
					],
				},
			],
			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksVoidReturn: false,
				},
			],
			'@typescript-eslint/unbound-method': 'off',
			'@typescript-eslint/no-confusing-void-expression': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/consistent-indexed-object-style': 'off',
			'sonarjs/function-return-type': 'off',
			'sonarjs/deprecation': 'off',
			'sonarjs/use-type-alias': 'off',
		},
	},
	{
		files: ['**/*.test.mts', '**/*.test-d.mts'],
		rules: {
			'@typescript-eslint/no-deprecated': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/require-await': 'off',
			'sort-keys': 'off',
			'sonarjs/assertions-in-tests': 'off',
			'sonarjs/no-duplicate-string': 'off',
			'sonarjs/no-nested-functions': "off",
			'@cspell/spellchecker': 'off',
		},
	},
);
