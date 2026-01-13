import { fetchPosts } from '@/lib/data'
import { generateLLMSTxt } from '@/lib/llms-txt'

export async function GET() {
  const posts = await fetchPosts()

  const llmsTxt = generateLLMSTxt(posts)

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
