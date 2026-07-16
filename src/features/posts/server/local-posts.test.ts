import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { getLocalPosts } from './local-posts'

const { mockGetLocalPostFiles } = vi.hoisted(() => ({
  mockGetLocalPostFiles: vi.fn<() => Array<{ slug: string; fullPath: string; sourceDir: string }>>(
    () => []
  )
}))

vi.mock('./local-post-files', () => ({
  findLocalPostFile: vi.fn(),
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
  mockGetLocalPostFiles.mockReset()
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
    mockGetLocalPostFiles.mockReturnValue([
      createPostFile(
        'draft',
        ['---', 'title: Draft', 'date: 2026-01-02', 'published: false', '---'].join('\n')
      )
    ])

    await expect(getLocalPosts()).resolves.toEqual([])
  })
})
