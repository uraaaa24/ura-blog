import { fetchPosts } from '@/lib/data'
import { generateAtomFeed } from '@/lib/feed'

export async function GET() {
  const posts = await fetchPosts()

  const atom = generateAtomFeed(posts)

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
