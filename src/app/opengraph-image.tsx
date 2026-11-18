import { createOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from '@/lib/og-image'

export const runtime = 'nodejs'

export const size = OG_IMAGE_SIZE

export const contentType = OG_IMAGE_CONTENT_TYPE

export default function OpenGraphImage() {
  return createOgImage()
}
