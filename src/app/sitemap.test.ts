import { describe, expect, it, vi } from 'vitest'

import { BASE_URL } from '@/lib/envs'

import sitemap from './sitemap'

const { mockGetLocalPosts } = vi.hoisted(() => ({
  mockGetLocalPosts: vi.fn()
}))

vi.mock('@/features/posts/server/posts', () => ({
  getLocalPosts: mockGetLocalPosts
}))

describe('sitemap', () => {
  it('builds post entries directly from local post summaries', async () => {
    mockGetLocalPosts.mockResolvedValue([
      {
        source: 'local',
        slug: 'local-post',
        href: '/posts/local-post',
        title: 'Local post',
        thumbnail: null,
        publishedAt: '2026-01-02T00:00:00.000Z',
        formattedDate: '2 Jan 2026',
        excerpt: '',
        tags: []
      }
    ])

    const entries = await sitemap()

    expect(mockGetLocalPosts).toHaveBeenCalledOnce()
    expect(entries).toContainEqual({
      url: new URL('/posts/local-post', BASE_URL).toString(),
      lastModified: new Date('2026-01-02T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.7
    })
  })
})
