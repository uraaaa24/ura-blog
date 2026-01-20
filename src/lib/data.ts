import { cache } from 'react'

import { getAllPosts } from './post'
import { getZennRssFeed } from './zenn'

export const fetchPosts = cache(async (limit?: number) => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  /**
   * Sort posts by date or formattedDate in descending order
   */
  const toSortTime = (value: { date: string; formattedDate: string }) => {
    const dateTime = new Date(value.date).getTime()
    if (!Number.isNaN(dateTime)) return dateTime

    const formattedTime = new Date(value.formattedDate).getTime()
    return Number.isNaN(formattedTime) ? 0 : formattedTime
  }

  // Duplicate posts (based on slug or title+date) are removed
  const deduped = new Map<string, (typeof posts)[number]>()
  for (const post of [...posts, ...zennPosts]) {
    const key = post.slug || `${post.title}-${post.date}`
    if (!deduped.has(key)) {
      deduped.set(key, post)
    }
  }

  const totalPosts = Array.from(deduped.values()).sort((a, b) => toSortTime(b) - toSortTime(a))

  return limit ? totalPosts.slice(0, limit) : totalPosts
})
