import fs from 'node:fs'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getAllPosts, getPostBySlug } from './post'

// Mock fs module
vi.mock('node:fs', () => ({
  __esModule: true,
  default: {
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
    copyFileSync: vi.fn()
  }
}))
vi.mock('@twemoji/api', () => ({
  default: {
    parse: vi.fn(
      (input: string) =>
        `<img src="https://twemoji.maxcdn.com/v/latest/72x72/1f3c3-200d-2642-fe0f.png" alt="${input}">`
    )
  }
}))

const mockFs = vi.mocked(fs)

const mockMarkdownContent = `---
title: Test Post
thumbnail: 🏃‍♂️
date: 2025-01-01
excerpt: This is a test post
tags:
  - test
  - blog
published: true
---

# Test Post

This is the content of the test post.`

describe('Post utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getAllPosts', () => {
    it('creates posts directory if it does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false)
      mockFs.mkdirSync.mockReturnValue('')
      mockFs.readdirSync.mockReturnValue([])

      await getAllPosts()

      expect(mockFs.mkdirSync).toHaveBeenCalledWith(expect.stringContaining('contents'), {
        recursive: true
      })
    })

    it('returns empty array when no markdown files exist', async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([])

      const posts = await getAllPosts()

      expect(posts).toEqual([])
    })

    it('filters only markdown files', async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'test.md',
        'test.txt',
        'another.MD',
        'image.png'
        // biome-ignore lint/suspicious/noExplicitAny: Mock return type needs any for test compatibility
      ] as any)
      mockFs.readFileSync.mockReturnValue(mockMarkdownContent)

      await getAllPosts()

      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2) // Only .md and .MD files
    })

    it('parses markdown files correctly', async () => {
      mockFs.existsSync.mockReturnValue(true)
      // biome-ignore lint/suspicious/noExplicitAny: Mock return type needs any for test compatibility
      mockFs.readdirSync.mockReturnValue(['test-post.md'] as any)
      mockFs.readFileSync.mockReturnValue(mockMarkdownContent)

      const posts = await getAllPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0]).toMatchObject({
        slug: 'test-post',
        title: 'Test Post',
        excerpt: 'This is a test post',
        tags: ['test', 'blog'],
        content: expect.stringContaining('This is the content of the test post.')
      })
      expect(posts[0].date).toBeDefined()
    })

    it('sorts posts by date (newest first)', async () => {
      const oldPost = mockMarkdownContent
        .replace('2025-01-01', '2024-01-01')
        .replace('Test Post', 'Old Post')
      const newPost = mockMarkdownContent
        .replace('2025-01-01', '2025-12-31')
        .replace('Test Post', 'New Post')

      mockFs.existsSync.mockReturnValue(true)
      // biome-ignore lint/suspicious/noExplicitAny: Mock return type needs any for test compatibility
      mockFs.readdirSync.mockReturnValue(['old.md', 'new.md'] as any)
      mockFs.readFileSync.mockReturnValueOnce(oldPost).mockReturnValueOnce(newPost)

      const posts = await getAllPosts()

      expect(posts[0].title).toBe('New Post')
      expect(posts[1].title).toBe('Old Post')
    })
  })

  describe('getPostBySlug', () => {
    it('returns undefined when file does not exist', async () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })

      const post = await getPostBySlug('nonexistent')

      expect(post).toBeUndefined()
    })

    it('returns parsed post when file exists', async () => {
      mockFs.readFileSync.mockReturnValue(mockMarkdownContent)

      const post = await getPostBySlug('test-post')

      expect(post).toMatchObject({
        slug: 'test-post',
        title: 'Test Post',
        excerpt: 'This is a test post',
        tags: ['test', 'blog']
      })
      expect(post?.date).toBeDefined()
    })

    it('formats date correctly for individual posts', async () => {
      mockFs.readFileSync.mockReturnValue(mockMarkdownContent)

      const post = await getPostBySlug('test-post')

      expect(post?.formattedDate).toMatch(/\d+ \w+ \d{4}/) // e.g., "1 January 2025"
    })
  })
})
