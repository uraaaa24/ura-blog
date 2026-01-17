// ESLint configuration focused only on import ordering

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import typescriptEslintParser from '@typescript-eslint/parser'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'

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
        project: './tsconfig.json',
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
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index'
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            }
          ]
        }
      ]
    }
  }
]
