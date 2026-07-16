import { describe, expect, it } from 'vitest'

import { toZennPostSummary } from './zenn-posts'

describe('toZennPostSummary', () => {
  it('creates an external summary with an explicit source and URL', () => {
    const post = toZennPostSummary({
      title: 'Zenn article',
      link: 'https://zenn.dev/example/articles/post',
      pubDate: 'Fri, 02 Jan 2026 00:00:00 GMT',
      content: '<p>Article description</p>'
    })

    expect(post).toEqual({
      source: 'zenn',
      articleUrl: 'https://zenn.dev/example/articles/post',
      href: 'https://zenn.dev/example/articles/post',
      title: 'Zenn article',
      thumbnail: '/zenn.svg',
      publishedAt: '2026-01-02T00:00:00.000Z',
      formattedDate: '2 Jan 2026',
      excerpt: '',
      tags: []
    })
    expect(post).not.toHaveProperty('content')
    expect(post).not.toHaveProperty('slug')
  })
})
