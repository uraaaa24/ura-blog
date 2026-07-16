import { describe, expect, it } from 'vitest'

import type { LocalPostSummary, ZennPostSummary } from '../types'
import { mergePostSummaries } from './posts'

const localPost = (overrides: Partial<LocalPostSummary> = {}): LocalPostSummary => ({
  source: 'local',
  slug: 'local-post',
  href: '/posts/local-post',
  title: 'Local post',
  thumbnail: null,
  publishedAt: '2026-01-02T00:00:00.000Z',
  formattedDate: '2 Jan 2026',
  excerpt: 'Local excerpt',
  tags: ['React'],
  ...overrides
})

const zennPost = (overrides: Partial<ZennPostSummary> = {}): ZennPostSummary => ({
  source: 'zenn',
  articleUrl: 'https://zenn.dev/example/articles/zenn-post',
  href: 'https://zenn.dev/example/articles/zenn-post',
  title: 'Zenn post',
  thumbnail: '/zenn.svg',
  publishedAt: '2026-02-03T00:00:00.000Z',
  formattedDate: '3 Feb 2026',
  excerpt: '',
  tags: [],
  ...overrides
})

describe('mergePostSummaries', () => {
  it('merges local and Zenn summaries in descending publication order', () => {
    const posts = mergePostSummaries([localPost()], [zennPost()])

    expect(posts.map((post) => post.source)).toEqual(['zenn', 'local'])
  })

  it('deduplicates posts by their source-specific identity', () => {
    const posts = mergePostSummaries(
      [localPost(), localPost({ title: 'Duplicate local post' })],
      [zennPost(), zennPost({ title: 'Duplicate Zenn post' })]
    )

    expect(posts).toHaveLength(2)
    expect(posts.map((post) => post.title)).toEqual(['Zenn post', 'Local post'])
  })

  it('applies a limit after sorting and deduplication', () => {
    const posts = mergePostSummaries([localPost()], [zennPost()], 1)

    expect(posts).toEqual([zennPost()])
  })
})
