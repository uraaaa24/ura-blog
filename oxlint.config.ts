import { defineConfig } from 'oxlint'
import type { OxlintOverride } from 'oxlint'

const APP_LAYER = { group: ['@/app', '@/app/**'], message: 'Must not depend on the app layer.' }

const featureBoundary = (feature: string): OxlintOverride => ({
  files: [`src/features/${feature}/**`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/features/**', `!@/features/${feature}`, `!@/features/${feature}/**`],
            message: 'Features must not depend on another feature.'
          },
          APP_LAYER
        ]
      }
    ]
  }
})

export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'react', 'nextjs', 'jsx-a11y', 'import'],
  categories: {
    correctness: 'error'
  },
  options: {
    reportUnusedDisableDirectives: 'error'
  },
  ignorePatterns: ['dist/**'],
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    eqeqeq: ['error', 'always'],
    'typescript/ban-ts-comment': [
      'error',
      { 'ts-expect-error': 'allow-with-description', minimumDescriptionLength: 3 }
    ],
    'typescript/no-explicit-any': 'error',
    'typescript/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
    ],
    'typescript/array-type': ['error', { default: 'array' }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'react/react-in-jsx-scope': 'off',
    'react/exhaustive-deps': 'error',
    'react/no-array-index-key': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'jsx-a11y/control-has-associated-label': 'error'
  },
  overrides: [
    featureBoundary('posts'),
    featureBoundary('about'),
    featureBoundary('crossing-game'),
    {
      files: [
        'src/components/**',
        'src/constants/**',
        'src/hooks/**',
        'src/lib/**',
        'src/providers/**',
        'src/types/**',
        'src/utils/**'
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@/features', '@/features/**'],
                message: 'Shared modules must not depend on features.'
              },
              APP_LAYER
            ]
          }
        ]
      }
    },
    {
      // Server Component: the year is computed once per render on the server.
      files: ['src/components/layouts/footer/index.tsx'],
      rules: { 'react/purity': 'off' }
    },
    {
      // Markdown images accept arbitrary sources and preserve their intrinsic dimensions.
      files: ['src/features/posts/components/markdown/md-image.tsx'],
      rules: { 'nextjs/no-img-element': 'off' }
    }
  ]
})
