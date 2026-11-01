import { readFileSync } from 'node:fs'

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
  it('configures the public origin for production builds', () => {
    expect(readFileSync('.env.production', 'utf8')).toContain(
      'NEXT_PUBLIC_APP_BASE_URL=https://urarara.me'
    )
  })

  it('uses the public domain and verified update dates for published posts only', async () => {
    mockGetLocalPosts.mockResolvedValue([
      {
        source: 'local',
        slug: 'local-post',
        href: '/posts/local-post',
        title: 'Local post',
        thumbnail: null,
        publishedAt: '2026-01-02T00:00:00.000Z',
        updatedAt: '2026-02-03T00:00:00.000Z',
        formattedDate: '2 Jan 2026',
        excerpt: '',
        tags: []
      },
      {
        source: 'local',
        slug: 'unchanged',
        href: '/posts/unchanged',
        isDraft: false,
        publishedAt: '2026-01-02T00:00:00.000Z'
      },
      {
        source: 'local',
        slug: 'draft',
        href: '/posts/draft',
        isDraft: true,
        publishedAt: '2026-01-02T00:00:00.000Z'
      }
    ])

    const entries = await sitemap()

    expect(mockGetLocalPosts).toHaveBeenCalledOnce()
    expect(entries).toContainEqual({
      url: `${BASE_URL}/posts/local-post`,
      lastModified: new Date('2026-02-03T00:00:00.000Z')
    })
    expect(entries).toContainEqual({ url: `${BASE_URL}/posts/unchanged` })
    expect(entries.some((entry) => entry.url.includes('draft'))).toBe(false)
    expect(entries.every((entry) => new URL(entry.url).origin === BASE_URL)).toBe(true)
  })
})
