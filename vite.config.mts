/// <reference types="vitest" />

import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			exclude: ['src/**/index.mts', 'src/**/*.test-d.mts'],
			include: ['src/lib/*.mts'],
			provider: 'v8',
			reporter: ['text'],
		},
		include: ['**/*.test.mts'],
		reporters: ['verbose', 'github-actions'],
		typecheck: {
			include: ['**/*.test-d.mts'],
			tsconfig: './tsconfig.test.json',
		},
	},
});
