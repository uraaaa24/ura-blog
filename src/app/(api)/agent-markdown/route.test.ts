import { describe, expect, it, vi } from 'vitest'

import { GET } from './[...path]/route'

vi.mock('@/features/posts/server/posts', () => ({
  getPosts: vi.fn(async () => [
    { source: 'local', title: 'Public', href: '/posts/public', excerpt: '', isDraft: false },
    { source: 'local', title: 'Draft', href: '/posts/draft', excerpt: '', isDraft: true }
  ]),
  getPostBySlug: vi.fn(async (slug: string) =>
    slug === 'missing'
      ? undefined
      : {
          title: slug,
          href: `/posts/${slug}`,
          content: 'Article body',
          isDraft: slug === 'draft'
        }
  )
}))

const request = new Request('https://urarara.me/posts/example')
const params = (path: string[]) => ({ params: Promise.resolve({ path }) })

describe('Markdown route', () => {
  it('uses rewrite parameters rather than the original request URL', async () => {
    const response = await GET(request, params(['posts', 'public']))
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/markdown')
    expect(response.headers.get('cache-control')).toContain('no-store')
    expect(await response.text()).toContain('Article body')
  })

  it.each(['missing', 'draft'])('does not expose %s articles', async (slug) => {
    expect((await GET(request, params(['posts', slug]))).status).toBe(404)
  })

  it('omits drafts from the index', async () => {
    const response = await GET(request, params(['index']))
    const text = await response.text()
    expect(text).toContain('Public')
    expect(text).not.toContain('Draft')
  })
})
