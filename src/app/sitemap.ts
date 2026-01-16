import type { MetadataRoute } from 'next'

import { fetchPosts } from '@/lib/data'
import { BASE_URL } from '@/lib/envs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    }
  ]

  const allPosts = await fetchPosts()
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
