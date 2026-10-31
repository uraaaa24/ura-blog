import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { getLocalPosts, getPostBySlug } from './local-posts'

const { mockFindLocalPostFile, mockGetLocalPostFiles } = vi.hoisted(() => ({
  mockFindLocalPostFile:
    vi.fn<(slug: string) => { slug: string; fullPath: string; sourceDir: string } | undefined>(),
  mockGetLocalPostFiles: vi.fn<() => Array<{ slug: string; fullPath: string; sourceDir: string }>>(
    () => []
  )
}))

vi.mock('./local-post-files', () => ({
  findLocalPostFile: mockFindLocalPostFile,
  getLocalPostFiles: mockGetLocalPostFiles
}))

const tempDirectories: string[] = []

const createPostFile = (slug: string, markdown: string) => {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gana-blog-summary-'))
  const fullPath = path.join(sourceDir, 'index.md')
  fs.writeFileSync(fullPath, markdown)
  tempDirectories.push(sourceDir)
  return { slug, fullPath, sourceDir }
}

afterEach(() => {
  mockFindLocalPostFile.mockReset()
  mockGetLocalPostFiles.mockReset()
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  for (const directory of tempDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

describe('getLocalPosts', () => {
  it('maps published frontmatter to a summary without content or a table of contents', async () => {
    mockGetLocalPostFiles.mockReturnValue([
      createPostFile(
        'local-post',
        [
          '---',
          'title: Local post',
          'date: 2026-01-02',
          'published: true',
          'excerpt: Local excerpt',
          'tags:',
          '  - React',
          '---',
          '# Content that must stay on the server'
        ].join('\n')
      )
    ])

    const [post] = await getLocalPosts()

    expect(post).toMatchObject({
      source: 'local',
      slug: 'local-post',
      href: '/posts/local-post',
      title: 'Local post',
      publishedAt: '2026-01-02T00:00:00.000Z',
      excerpt: 'Local excerpt',
      tags: ['React']
    })
    expect(post).not.toHaveProperty('content')
    expect(post).not.toHaveProperty('toc')
  })

  it('excludes unpublished posts', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    mockGetLocalPostFiles.mockReturnValue([
      createPostFile(
        'draft',
        ['---', 'title: Draft', 'date: 2026-01-02', 'published: false', '---'].join('\n')
      )
    ])

    await expect(getLocalPosts()).resolves.toEqual([])
  })

  it('includes drafts when running the dev server', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    mockGetLocalPostFiles.mockReturnValue([
      createPostFile(
        'draft',
        ['---', 'title: Draft', 'date: 2026-01-02', 'published: false', '---'].join('\n')
      )
    ])

    const posts = await getLocalPosts()

    expect(posts.map((post) => post.slug)).toEqual(['draft'])
  })
})

describe('getPostBySlug', () => {
  it('previews drafts only in development', async () => {
    const postFile = createPostFile(
      'draft',
      ['---', 'title: Draft', 'date: 2026-01-02', 'published: false', '---', 'Draft body'].join(
        '\n'
      )
    )
    mockFindLocalPostFile.mockReturnValue(postFile)

    vi.stubEnv('NODE_ENV', 'development')
    await expect(getPostBySlug('draft')).resolves.toMatchObject({
      slug: 'draft',
      content: 'Draft body'
    })

    vi.stubEnv('NODE_ENV', 'production')
    await expect(getPostBySlug('draft')).resolves.toBeUndefined()
  })

  it('returns undefined when the post file does not exist', async () => {
    mockFindLocalPostFile.mockReturnValue(undefined)

    await expect(getPostBySlug('missing-post')).resolves.toBeUndefined()
  })

  it('propagates unexpected file read errors', async () => {
    const readError = new Error('Failed to read post file')
    mockFindLocalPostFile.mockReturnValue({
      slug: 'broken-post',
      fullPath: '/contents/broken-post/index.md',
      sourceDir: '/contents/broken-post'
    })
    vi.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
      throw readError
    })

    await expect(getPostBySlug('broken-post')).rejects.toBe(readError)
  })
})
