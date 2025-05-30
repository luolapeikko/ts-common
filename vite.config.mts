/// <reference types="vitest" />

import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		reporters: process.env.GITHUB_ACTIONS ? ['github-actions', 'junit'] : ['verbose', 'github-actions', 'junit'],
		outputFile: {
			junit: './test-results.xml',
		},
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
