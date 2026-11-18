import { defineConfig } from 'oxlint'

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
