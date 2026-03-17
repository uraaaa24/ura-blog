import { generateAtomFeed } from '@/lib/feed'
import { getAllPosts } from '@/lib/post'

export async function GET() {
  const posts = await getAllPosts()
  const atom = generateAtomFeed(posts)

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
