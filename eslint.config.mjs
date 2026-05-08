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
      // Architectural boundaries enforcement
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // Prevent cross-feature imports
            {
              target: './src/features/posts',
              from: './src/features',
              except: ['./posts']
            },
            {
              target: './src/features/books',
              from: './src/features',
              except: ['./books']
            },
            {
              target: './src/features/about',
              from: './src/features',
              except: ['./about']
            },
            // Features can't import from app
            {
              target: './src/features',
              from: './src/app'
            },
            // Shared layer can't import from features or app
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils'
              ],
              from: ['./src/features', './src/app']
            }
          ]
        }
      ]
    }
  }
]
