import { cache } from 'react'
import Parser from 'rss-parser'
import { RSS_FEEDS } from '../constants/rss-feeds'
import type { NewsArticle } from '../types'

type RssMediaField = {
  $?: {
    url?: string
  }
}

type RssCustomItemFields = {
  'content:encoded'?: string
  'media:content'?: RssMediaField
  'media:thumbnail'?: RssMediaField
  author?: string
  description?: string
}

type RssItem = Parser.Item & RssCustomItemFields

const parser = new Parser<Record<string, never>, RssCustomItemFields>({
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsReader/1.0)'
  },
  customFields: {
    item: [
      ['media:content', 'media:content'],
      ['media:thumbnail', 'media:thumbnail'],
      ['content:encoded', 'content:encoded']
    ]
  }
})

const getItemContent = (item: RssItem) =>
  item['content:encoded'] ?? item.content ?? item.description ?? ''

// Extract image URL from RSS item
const extractImageUrl = (item: RssItem): string | null => {
  // Try various image fields
  if (item.enclosure?.url) return item.enclosure.url
  if (item['media:content']?.$?.url) return item['media:content'].$.url
  if (item['media:thumbnail']?.$?.url) return item['media:thumbnail'].$.url

  // Try to extract from content/description
  const content = getItemContent(item)
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/)
  if (imgMatch) return imgMatch[1]

  return null
}

// Calculate word count estimate from description/content
const estimateWordCount = (item: RssItem): number => {
  const content = getItemContent(item)
  const cleanText = content.replace(/<[^>]*>/g, '').trim()
  const words = cleanText.split(/\s+/).filter((word: string) => word.length > 0)
  return words.length
}

// Convert RSS item to our NewsArticle format
const convertRssToArticle = (item: RssItem, sourceName: string): NewsArticle => {
  const wordCount = estimateWordCount(item)

  return {
    title: item.title || '',
    description: item.contentSnippet || item.description || null,
    url: item.link || '',
    urlToImage: extractImageUrl(item),
    publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
    source: {
      id: sourceName.toLowerCase().replace(/\s+/g, '-'),
      name: sourceName
    },
    author: item.creator || item.author || null,
    content: null, // Not needed since we're linking externally
    wordCount
  }
}

const isFulfilled = <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
  result.status === 'fulfilled'

export const getNews = cache(async (): Promise<NewsArticle[]> => {
  try {
    // Fetch all RSS feeds in parallel with balanced article counts
    const feedResults = await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        try {
          const parsedFeed = await parser.parseURL(feed.url)
          // Take only 2-3 items from each feed for better balance
          return parsedFeed.items.slice(0, 3).map((item) => convertRssToArticle(item, feed.name))
        } catch (error) {
          console.error(`Failed to fetch ${feed.name}:`, error)
          return []
        }
      })
    )

    // Collect successful results
    const allArticles = feedResults.filter(isFulfilled).flatMap((result) => result.value)

    // Remove duplicates by URL
    const uniqueArticles = Array.from(
      new Map(allArticles.map((article) => [article.url, article])).values()
    )

    // Shuffle articles for better variety
    const shuffledArticles = uniqueArticles.sort(() => Math.random() - 0.5)

    // Filter articles - require description and exclude podcast-only pages
    const filteredArticles = shuffledArticles
      .filter((article) => {
        if (!article.title || !article.url) return false

        // Description is required and must be at least 50 characters
        if (!article.description || article.description.length < 50) {
          return false
        }

        // Exclude podcast-only pages
        const titleLower = article.title.toLowerCase()
        const urlLower = article.url.toLowerCase()

        if (titleLower.includes('podcast') || urlLower.includes('/podcast/')) {
          return false
        }

        return true
      })
      .slice(0, 15) // Show up to 15 articles

    return filteredArticles
  } catch (error) {
    console.error('Error fetching RSS feeds:', error)
    return []
  }
})
