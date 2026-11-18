import { getPosts } from '@/features/posts/server/posts'
import { BASE_URL } from '@/lib/envs'

export const revalidate = 3600

export async function GET() {
  const posts = await getPosts()
  const articles = posts
    .filter((post) => post.source !== 'local' || !post.isDraft)
    .map(({ title, href, excerpt, tags }) => ({
      title,
      href: new URL(href, BASE_URL).toString(),
      excerpt,
      tags
    }))

  return Response.json(articles, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' }
  })
}
