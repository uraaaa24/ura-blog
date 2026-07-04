import { getPosts } from '@/features/posts/api/get-posts'
import { BASE_URL } from '@/lib/envs'

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/posts`,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/dev`,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ]

  const allPosts = await getPosts()
  // Zenn記事（外部リンク）をサイトマップから除外
  const localPosts = allPosts.filter((post) => !post.slug.startsWith('https://'))
  const postPages: MetadataRoute.Sitemap = localPosts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  return [...defaultPages, ...postPages]
}
