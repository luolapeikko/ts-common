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
			include: ['src/**/*.mts'],
			reporter: ['text'],
		},
		include: ['test/**/*.test.mts'],
		typecheck: {
			tsconfig: './tsconfig.test.json',
			include: ['test/**/*.test-d.mts']
		}
	},
});
