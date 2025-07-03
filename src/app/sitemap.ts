import type { MetadataRoute } from 'next'

import { fetchPosts } from '@/lib/data'
import { BASE_URL } from '@/lib/envs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date()
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date()
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date()
    }
  ]

  const allPosts = await fetchPosts()
  const postPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date)
  }))

  return [...defaultPages, ...postPages]
}
