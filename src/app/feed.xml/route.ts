import { fetchPosts } from '@/lib/data'
import { generateRSSFeed } from '@/lib/feed'

export async function GET() {
  const posts = await fetchPosts()

  const rss = generateRSSFeed(posts)

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
