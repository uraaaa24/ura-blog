import type { TocItem } from '@/lib/toc'

export type Post = {
  slug: string
  title: string
  thumbnail: string | null
  date: string
  formattedDate: string
  content: string
  excerpt?: string
  tags?: string[]
  toc?: TocItem[]
}

export type ZennRSSItem = {
  title: string
  link: string
  pubDate: string
  content: string
}
