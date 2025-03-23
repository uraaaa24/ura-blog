import { getAllNotionPosts } from './notion'
import { getZennRssFeed } from './zenn'

export const fetchPosts = async (limit?: number) => {
  const zennPosts = await getZennRssFeed()
  const notionPosts = await getAllNotionPosts()

  const totalPosts = Array.from(new Set([...zennPosts, ...notionPosts])).sort(
    (a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime()
  )

  return limit ? totalPosts.slice(0, limit) : totalPosts
}
