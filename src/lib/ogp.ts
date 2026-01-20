import type { Post } from './post'

/**
 * 記事データからOGPメタデータを生成
 * Next.js の opengraph-image.tsx を使用するため、OG画像URLは自動生成される
 */
export function generateOGPMetadata(post: Post) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || ''
  const canonicalUrl = `${baseUrl}/posts/${post.slug}`

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
      siteName: 'Uralog',
      locale: 'ja_JP',
      type: 'article' as const,
      publishedTime: post.date,
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: post.title,
      description: post.excerpt || `${post.title}について書いた記事です。`
    }
  }
}
