// ESLint configuration focused only on import ordering

import typescriptEslintParser from '@typescript-eslint/parser'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const trimGlobalKeys = (g) => Object.fromEntries(Object.entries(g).map(([k, v]) => [k.trim(), v]))

export default [
  {
    ignores: ['.next', 'dist/**', '**/*.css.d.ts', '**/*.css.d.ts.map', 'storybook-static/**']
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: { ...trimGlobalKeys(globals.browser), ...trimGlobalKeys(globals.node) },
      parser: typescriptEslintParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs', 'stylelint.config.mjs', 'postcss.config.mjs']
        },
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      import: pluginImport
    },
    rules: {
      // Only import ordering rules
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // fs, path など
            'external', // react, next, lodash など
            'internal', // @/...
            ['parent', 'sibling'], // ../, ./
            'index', // ./index
            'type' // import type
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          pathGroupsExcludedImportTypes: ['builtin'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            }
          ]
        }
      ]
    }
  }
]
