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
