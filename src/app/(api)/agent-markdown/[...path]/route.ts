import { getPosts, getPostBySlug } from '@/features/posts/server/posts'
import { BASE_URL } from '@/lib/envs'

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params
  const path = segments.join('/') === 'index' ? '/' : `/${segments.join('/')}`
  let markdown: string
  if (path === '/' || path === '/posts') {
    const posts = await getPosts()
    markdown =
      `# ${path === '/' ? "ura's notes" : 'Posts'}\n\nReact、Next.js、TypeScriptや日々の学びを記録する個人ブログ。\n\n` +
      posts
        .filter((post) => post.source !== 'local' || !post.isDraft)
        .map((post) => `- [${post.title}](${new URL(post.href, BASE_URL)}): ${post.excerpt}`)
        .join('\n')
  } else {
    const match = /^\/posts\/([^/]+)$/.exec(path)
    const post = match ? await getPostBySlug(match[1]) : undefined
    if (!post || post.isDraft) return new Response('Not Found', { status: 404 })
    markdown = `# ${post.title}\n\n${BASE_URL}${post.href}\n\n${post.content}`
  }
  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      // Keep negotiated representations out of shared caches.
      'Cache-Control': 'private, no-store'
    }
  })
}
