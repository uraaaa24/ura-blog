import { cache } from 'react'

import type { Post } from '../types'
import { getLocalPosts } from './get-local-posts'

/**
 * 関連記事を取得する関数（タグベースでの類似度計算）
 */
export const getRelatedPosts = cache(
  async (currentPost: Post, limit: number = 3): Promise<Post[]> => {
    const allPosts = await getLocalPosts()
    const currentTags = currentPost.tags || []

    // 現在の記事を除外
    const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug)

    // タグの一致数でスコアリング
    const postsWithScores = otherPosts.map((post) => {
      const postTags = post.tags || []
      const matchingTags = postTags.filter((tag) => currentTags.includes(tag))
      return {
        post,
        score: matchingTags.length
      }
    })

    // スコアの高い順にソートして、上位limit件を返す
    return postsWithScores
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.post)
  }
)
