import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'none',
  arrowParens: 'always',
  sortImports: {
    groups: [
      ['type-builtin', 'value-builtin', 'type-external', 'value-external'],
      [
        'type-internal',
        'value-internal',
        'type-subpath',
        'value-subpath',
        'type-parent',
        'value-parent',
        'type-sibling',
        'value-sibling',
        'type-index',
        'value-index'
      ],
      'unknown'
    ],
    newlinesBetween: true,
    sortSideEffects: false
  },
  sortTailwindcss: { stylesheet: './src/styles/globals.css' },
  sortPackageJson: false,
  ignorePatterns: ['contents/**', '**/*.md', '.github/**', 'pnpm-lock.yaml']
})
