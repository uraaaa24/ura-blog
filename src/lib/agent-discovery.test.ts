import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { prefersMarkdown } from './agent-discovery'

describe('Markdown negotiation', () => {
  it.each([
    ['text/markdown', true],
    ['text/markdown; charset=utf-8', true],
    ['text/html, text/markdown;q=0.5', false],
    ['text/html;q=0.5, text/markdown', true],
    ['text/markdown;q=0', false],
    ['text/markdown;q=invalid', false],
    ['text/markdown;q=2', false],
    ['text/*', false],
    ['*/*', false],
    ['', false]
  ])('%s -> %s', (accept, expected) => {
    expect(prefersMarkdown(accept)).toBe(expected)
  })
})

it('publishes the exact SHA-256 digest of the skill artifact', () => {
  const index = JSON.parse(readFileSync('public/.well-known/agent-skills/index.json', 'utf8'))
  const bytes = readFileSync('public/.well-known/agent-skills/read-blog/SKILL.md')
  expect(index.skills[0].digest).toBe(`sha256:${createHash('sha256').update(bytes).digest('hex')}`)
})
