import { cache } from 'react'

import type { LocalPost, LocalPostSummary, PostSummary, ZennPostSummary } from '../types'
import { getLocalPosts } from './local-posts'
import { getZennPosts } from './zenn-posts'

export { getLocalPosts, getPostBySlug } from './local-posts'

const getPostIdentity = (post: PostSummary) =>
  post.source === 'local' ? `local:${post.slug}` : `zenn:${post.articleUrl}`

const toSortTime = (post: PostSummary) => {
  const publishedTime = new Date(post.publishedAt).getTime()
  if (!Number.isNaN(publishedTime)) return publishedTime

  const formattedTime = new Date(post.formattedDate).getTime()
  return Number.isNaN(formattedTime) ? 0 : formattedTime
}

export const mergePostSummaries = (
  localPosts: LocalPostSummary[],
  zennPosts: ZennPostSummary[],
  limit?: number
): PostSummary[] => {
  const deduped = new Map<string, PostSummary>()

  for (const post of [...localPosts, ...zennPosts]) {
    const key = getPostIdentity(post)
    if (!deduped.has(key)) deduped.set(key, post)
  }

  const sortedPosts = Array.from(deduped.values()).sort((a, b) => toSortTime(b) - toSortTime(a))
  return limit === undefined ? sortedPosts : sortedPosts.slice(0, limit)
}

/** ローカル記事とZenn記事を統合して返す。 */
export const getPosts = cache(async (limit?: number) => {
  const [localPosts, zennPosts] = await Promise.all([getLocalPosts(), getZennPosts()])
  return mergePostSummaries(localPosts, zennPosts, limit)
})

/** タグの一致数が多いローカル記事を返す。 */
export const getRelatedPosts = cache(
  async (currentPost: LocalPost, limit = 3): Promise<LocalPostSummary[]> => {
    const allPosts = await getLocalPosts()

    return allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .map((post) => ({
        post,
        score: post.tags.filter((tag) => currentPost.tags.includes(tag)).length
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post }) => post)
  }
)
