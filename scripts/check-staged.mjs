import { spawnSync } from 'node:child_process'

const staged = spawnSync('git', ['diff', '--cached', '--name-only', '-z', '--diff-filter=ACMR'], {
  encoding: 'buffer'
})

if (staged.status !== 0) {
  process.stderr.write(staged.stderr)
  process.exit(staged.status ?? 1)
}

const files = staged.stdout.toString().split('\0').filter(Boolean)

if (files.length === 0) {
  console.log('No staged files to check.')
  process.exit(0)
}

const unstaged = spawnSync('git', ['diff', '--name-only', '-z'], { encoding: 'buffer' })
if (unstaged.status !== 0) {
  process.stderr.write(unstaged.stderr)
  process.exit(unstaged.status ?? 1)
}

const unstagedFiles = new Set(unstaged.stdout.toString().split('\0').filter(Boolean))
const partiallyStaged = files.filter((file) => unstagedFiles.has(file))
if (partiallyStaged.length > 0) {
  console.error(`Cannot check staged content with unstaged edits in: ${partiallyStaged.join(', ')}`)
  process.exit(1)
}

const run = (args) => {
  const result = spawnSync('pnpm', ['exec', ...args], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

run(['oxfmt', '--check', '--no-error-on-unmatched-pattern', ...files])

const sourceFiles = files.filter((file) => /\.[cm]?[jt]sx?$/.test(file))
if (sourceFiles.length > 0) run(['oxlint', ...sourceFiles])
