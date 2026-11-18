import { getPostBySlug } from '@/features/posts/server/posts'
import { createOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from '@/lib/og-image'

export const runtime = 'nodejs'

export const size = OG_IMAGE_SIZE

export const contentType = OG_IMAGE_CONTENT_TYPE

export default async function OpenGraphImage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)

  return createOgImage({ title: post?.title })
}
