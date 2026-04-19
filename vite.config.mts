/// <reference types="vitest" />

import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		reporters: ['verbose', 'github-actions'],
		coverage: {
			provider: 'v8',
			include: ['src/lib/*.mts'],
			exclude: ['src/**/index.mts', 'src/**/*.test-d.mts'],
			reporter: ['text'],
		},
		include: ['**/*.test.mts'],
		typecheck: {
			tsconfig: './tsconfig.test.json',
			include: ['**/*.test-d.mts'],
		},
	},
});
