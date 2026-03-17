import { generateRSSFeed } from '@/lib/feed'
import { getAllPosts } from '@/lib/post'

export async function GET() {
  const posts = await getAllPosts()
  const rss = generateRSSFeed(posts)

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
