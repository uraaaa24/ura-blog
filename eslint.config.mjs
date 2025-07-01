// ESLint configuration focused only on import ordering
import { FlatCompat } from '@eslint/eslintrc'
import typescriptEslintParser from '@typescript-eslint/parser'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  {
    ignores: ['.next', 'dist/**', '**/*.css.d.ts', '**/*.css.d.ts.map', 'storybook-static/**']
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: typescriptEslintParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'eslint.config.mjs',
            'stylelint.config.mjs',
            'postcss.config.mjs',
            'next.config.ts'
          ]
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
