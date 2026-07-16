import { getLocalPosts } from '@/features/posts/server/posts'
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

  const localPosts = await getLocalPosts()
  const postPages: MetadataRoute.Sitemap = localPosts.map((post) => ({
    url: new URL(post.href, BASE_URL).toString(),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  return [...defaultPages, ...postPages]
}
