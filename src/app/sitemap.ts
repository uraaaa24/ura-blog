import { getLocalPosts } from '@/features/posts/server/posts'
import { BASE_URL } from '@/lib/envs'

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL
    },
    {
      url: `${BASE_URL}/about`
    },
    {
      url: `${BASE_URL}/posts`
    },
    {
      url: `${BASE_URL}/dev`
    },
    {
      url: `${BASE_URL}/dev/crossy-road`
    }
  ]

  const localPosts = await getLocalPosts()
  const postPages: MetadataRoute.Sitemap = localPosts
    .filter((post) => !post.isDraft)
    .map((post) => ({
      url: new URL(post.href, BASE_URL).toString(),
      ...(post.updatedAt ? { lastModified: new Date(post.updatedAt) } : {})
    }))

  return [...defaultPages, ...postPages]
}
