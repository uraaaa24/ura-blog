import { cache } from 'react'

import type { Post } from '../types'
import { getLocalPosts } from './get-local-posts'
import { getZennPosts } from './get-zenn-posts'

/**
 * ローカル投稿とZenn投稿を統合して取得する
 */
export const getPosts = cache(async (limit?: number): Promise<Post[]> => {
  const [localPosts, zennPosts] = await Promise.all([getLocalPosts(), getZennPosts()])

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
  const deduped = new Map<string, Post>()
  for (const post of [...localPosts, ...zennPosts]) {
    const key = post.slug || `${post.title}-${post.date}`
    if (!deduped.has(key)) {
      deduped.set(key, post)
    }
  }

  const totalPosts = Array.from(deduped.values()).sort((a, b) => toSortTime(b) - toSortTime(a))

  return limit ? totalPosts.slice(0, limit) : totalPosts
})
