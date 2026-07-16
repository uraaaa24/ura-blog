import type { TocItem } from '@/lib/toc'

type PostSummaryFields = {
  title: string
  href: string
  thumbnail: string | null
  publishedAt: string
  formattedDate: string
  excerpt: string
  tags: string[]
}

export type LocalPostSummary = PostSummaryFields & {
  source: 'local'
  slug: string
  href: `/posts/${string}`
}

export type ZennPostSummary = PostSummaryFields & {
  source: 'zenn'
  articleUrl: string
}

export type PostSummary = LocalPostSummary | ZennPostSummary

export type LocalPost = LocalPostSummary & {
  content: string
  toc: TocItem[]
}
