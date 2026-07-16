import { cache } from 'react'

import type { ZennPostSummary } from '../types'

export type ZennRSSItem = {
  title: string
  link: string
  pubDate: string
  content: string
}

type ZennRSSFeed = {
  items: ZennRSSItem[]
}

const parseRSSXML = (xmlText: string): ZennRSSFeed => {
  const itemBlocks = xmlText.match(/<item\b[^>]*>[\s\S]*?<\/item>/g) ?? []

  const items = itemBlocks.map((itemXml): ZennRSSItem => {
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)
    const descriptionMatch = itemXml.match(
      /<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/
    )

    return {
      title: titleMatch?.[1] || titleMatch?.[2] || '',
      link: itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '',
      pubDate: itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '',
      content: descriptionMatch?.[1] || descriptionMatch?.[2] || ''
    }
  })

  return { items }
}

export const toZennPostSummary = (item: ZennRSSItem): ZennPostSummary => {
  const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date()
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(publishedAt)

  return {
    source: 'zenn',
    articleUrl: item.link,
    href: item.link,
    title: item.title,
    thumbnail: '/zenn.svg',
    publishedAt: publishedAt.toISOString(),
    formattedDate,
    excerpt: '',
    tags: []
  }
}

export const getZennPosts = cache(async (): Promise<ZennPostSummary[]> => {
  try {
    const response = await fetch('https://zenn.dev/uraaaa24/feed?all=1', {
      next: { revalidate: 3600 }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const feed = parseRSSXML(await response.text())
    return feed.items.map(toZennPostSummary)
  } catch (error) {
    console.error('Failed to fetch Zenn RSS feed:', error)
    return []
  }
})
