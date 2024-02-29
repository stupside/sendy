import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  allConfig: js.configs.all,
  recommendedConfig: js.configs.recommended,
})

/**
 * @type {import('@eslint/eslintrc').ESLintConfig}
 */
export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/build', '**/types', '**/.*'],
  },
  js.configs.recommended,
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
    ],
  }),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-console': 'warn',

      // Enable TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',

      // Disable conflicting import rules
      'import/order': 'off',

      // Enable simple import sort rules with custom grouping
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Node.js built-ins
            ['^node:'],
            // Next.js packages
            ['^next(/.*|$)'],
            // React packages
            ['^react(/.*|$)', '^@react.*?(/.*|$)'],
            // Other packages starting with @ (scoped packages)
            // Group by package name by using positive lookahead
            ['^@(?!sendy)(?=.*?)([^/]+)/[^/]+(/.*|$)'],
            // Regular packages - group by package name using positive lookahead
            ['^(?=[^@])(?=.*?)([^/]+)(/.*|$)'],
            // Sendy packages
            ['^@sendy(/.*|$)'],
            // Relative imports
            ['^\\.'],
            // Style imports
            ['^.+\\.?(css|scss|sass|less)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]
