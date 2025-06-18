import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchPosts } from '@/lib/data'

// Mock the dependencies
vi.mock('./post', () => ({
  getAllPosts: vi.fn()
}))

vi.mock('./zenn', () => ({
  getZennRssFeed: vi.fn()
}))

import { getAllPosts } from './post'
import { getZennRssFeed } from './zenn'

const mockAllPosts = vi.mocked(getAllPosts)
const mockGetZennRssFeed = vi.mocked(getZennRssFeed)

const mockLocalPosts = [
  {
    slug: 'local-post-2',
    title: 'Local Post 2',
    thumbnail: '/thumbnail2.png',
    date: '2025-01-02',
    formattedDate: '2 Jan 2025',
    content: 'Content 2',
    excerpt: 'Excerpt 2',
    tags: ['local']
  },
  {
    slug: 'local-post-1',
    title: 'Local Post 1',
    thumbnail: '/thumbnail1.png',
    date: '2025-01-01',
    formattedDate: '1 Jan 2025',
    content: 'Content 1',
    excerpt: 'Excerpt 1',
    tags: ['local']
  }
]

const mockZennPosts = [
  {
    slug: 'https://zenn.dev/uraaaa24/articles/zenn-post-1',
    title: 'Zenn Post 1',
    thumbnail: '/zenn.svg',
    date: '2025-01-03',
    formattedDate: '3 Jan 2025',
    content: 'Zenn content 1',
    excerpt: '',
    tags: []
  }
]

describe('fetchPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('merges local posts and Zenn posts', async () => {
    mockAllPosts.mockResolvedValue(mockLocalPosts)
    mockGetZennRssFeed.mockResolvedValue(mockZennPosts)

    const posts = await fetchPosts()

    expect(posts).toHaveLength(3)
    expect(posts.map((p) => p.title)).toContain('Local Post 1')
    expect(posts.map((p) => p.title)).toContain('Local Post 2')
    expect(posts.map((p) => p.title)).toContain('Zenn Post 1')
  })

  it('sorts posts by formatted date in descending order', async () => {
    mockAllPosts.mockResolvedValue(mockLocalPosts)
    mockGetZennRssFeed.mockResolvedValue(mockZennPosts)

    const posts = await fetchPosts()

    expect(posts[0].title).toBe('Zenn Post 1') // 3 Jan 2025
    expect(posts[1].title).toBe('Local Post 2') // 2 Jan 2025
    expect(posts[2].title).toBe('Local Post 1') // 1 Jan 2025
  })

  it('handles empty local posts', async () => {
    mockAllPosts.mockResolvedValue([])
    mockGetZennRssFeed.mockResolvedValue(mockZennPosts)

    const posts = await fetchPosts()

    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Zenn Post 1')
  })

  it('handles empty Zenn posts', async () => {
    mockAllPosts.mockResolvedValue(mockLocalPosts)
    mockGetZennRssFeed.mockResolvedValue([])

    const posts = await fetchPosts()

    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Local Post 2')
    expect(posts[1].title).toBe('Local Post 1')
  })

  it('limits posts when limit parameter is provided', async () => {
    mockAllPosts.mockResolvedValue(mockLocalPosts)
    mockGetZennRssFeed.mockResolvedValue(mockZennPosts)

    const posts = await fetchPosts(2)

    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Zenn Post 1')
    expect(posts[1].title).toBe('Local Post 2')
  })

  it('handles posts from different sources correctly', async () => {
    // Array.from(new Set()) only removes exact object references, not deep duplicates
    // Since the posts are different object instances, all will be kept
    const duplicatePost = { ...mockZennPosts[0] }
    mockAllPosts.mockResolvedValue([...mockLocalPosts, duplicatePost])
    mockGetZennRssFeed.mockResolvedValue(mockZennPosts)

    const posts = await fetchPosts()

    // Should have 4 posts since they are different object instances
    expect(posts).toHaveLength(4)
    expect(posts.map((p) => p.title)).toEqual([
      'Zenn Post 1', // Latest date
      'Zenn Post 1', // Duplicate object
      'Local Post 2',
      'Local Post 1'
    ])
  })
})
