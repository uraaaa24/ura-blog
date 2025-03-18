import { getAllPosts } from './post'
import { getZennRssFeed } from './zenn'

export const fetchPosts = async (limit?: number) => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  const totalPosts = Array.from(new Set([...posts, ...zennPosts])).sort(
    (a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime()
  )

  return limit ? totalPosts.slice(0, limit) : totalPosts
}
