import { BASE_URL } from './envs'

type OGPPost = {
  href: string
  title: string
  publishedAt: string
  excerpt?: string
  tags?: string[]
}

/**
 * 記事データからOGPメタデータを生成
 * Next.js の opengraph-image.tsx を使用するため、OG画像URLは自動生成される
 */
export function generateOGPMetadata(post: OGPPost) {
  const canonicalUrl = new URL(post.href, BASE_URL).toString()

  return {
    title: post.title,
    description: post.excerpt || `${post.title}について書いた記事です。`,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title}について書いた記事です。`,
      url: canonicalUrl,
      siteName: 'Gana',
      locale: 'ja_JP',
      type: 'article' as const,
      publishedTime: post.publishedAt,
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: post.title,
      description: post.excerpt || `${post.title}について書いた記事です。`
    }
  }
}
