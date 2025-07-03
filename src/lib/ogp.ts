import type { Post } from './post'

/**
 * サムネイルから絵文字を抽出
 * twemojiのSVG URLから絵文字を抽出するか、そのまま返す
 */
export function extractEmojiFromThumbnail(thumbnail: string | null): string {
  if (!thumbnail) return '📝'

  // twemojiのSVG URLの場合、絵文字を抽出
  if (thumbnail.includes('twemoji')) {
    // SVG URLから絵文字を推定するのは複雑なので、デフォルトを返す
    return '📝'
  }

  // 絵文字の場合はそのまま返す
  return thumbnail
}

/**
 * 記事データからOGP画像のURLを生成
 */
export function generateOGPImageUrl(post: Post, baseUrl = ''): string {
  const params = new URLSearchParams()

  // slugを最優先で使用（記事データから直接生成）
  params.set('slug', post.slug)

  // フォールバック用にパラメータも設定
  params.set('title', post.title)

  if (post.formattedDate) {
    params.set('date', post.formattedDate)
  }

  if (post.tags && post.tags.length > 0) {
    params.set('tags', post.tags.slice(0, 3).join(', '))
  }

  if (post.thumbnail) {
    const emoji = extractEmojiFromThumbnail(post.thumbnail)
    params.set('emoji', emoji)
  }

  return `${baseUrl}/api/og?${params.toString()}`
}

/**
 * 記事データからOGPメタデータを生成
 */
export function generateOGPMetadata(post: Post, baseUrl = '') {
  const ogImageUrl = generateOGPImageUrl(post, baseUrl)

  return {
    title: post.title,
    description: post.excerpt || `${post.title}について書いた記事です。`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title}について書いた記事です。`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      type: 'article',
      publishedTime: post.date,
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `${post.title}について書いた記事です。`,
      images: [ogImageUrl]
    }
  }
}
