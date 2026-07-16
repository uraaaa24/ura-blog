import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eslintConfig = [
  {
    ignores: ['dist/**', '**/*.css.d.ts', '**/*.css.d.ts.map', 'storybook-static/**']
  },
  ...nextCoreWebVitals,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname
      }
    }
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          basePath: __dirname,
          zones: [
            {
              target: './src/features/posts',
              from: './src/features',
              except: ['./posts'],
              message: 'Posts must not depend on another feature.'
            },
            {
              target: './src/features/about',
              from: './src/features',
              except: ['./about'],
              message: 'About must not depend on another feature.'
            },
            {
              target: './src/features/crossing-game',
              from: './src/features',
              except: ['./crossing-game'],
              message: 'Crossing game must not depend on another feature.'
            },
            {
              target: './src/features',
              from: './src/app',
              message: 'Features must not depend on the app layer.'
            },
            {
              target: [
                './src/components',
                './src/constants',
                './src/hooks',
                './src/lib',
                './src/providers',
                './src/types',
                './src/utils'
              ],
              from: ['./src/features', './src/app'],
              message: 'Shared modules must not depend on features or the app layer.'
            }
          ]
        }
      ]
    }
  },
  {
    files: ['src/components/ui/markdown/md-image.tsx'],
    rules: {
      // Markdown images accept arbitrary sources and preserve their intrinsic dimensions.
      '@next/next/no-img-element': 'off'
    }
  }
]

export default eslintConfig
