type ZennRSSItem = {
  title: string
  link: string
  pubDate: string
  content: string
}

type ZennRSSFeed = {
  items: ZennRSSItem[]
}

/**
 * RSS XMLをパースする軽量な関数（正規表現ベース）
 */
const parseRSSXML = (xmlText: string): ZennRSSFeed => {
  const itemBlocks = xmlText.match(/<item\b[^>]*>[\s\S]*?<\/item>/g) ?? []

  const items: ZennRSSItem[] = itemBlocks.map((itemXml) => {
    const title =
      itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] ||
      itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[2] ||
      ''
    const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || ''
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
    const content =
      itemXml.match(
        /<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/
      )?.[1] ||
      itemXml.match(
        /<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/
      )?.[2] ||
      ''

    return { title, link, pubDate, content }
  })

  return { items }
}

/**
 * ZennのRSSフィードを取得してパースする関数
 */
export const getZennRssFeed = async () => {
  try {
    const response = await fetch('https://zenn.dev/uraaaa24/feed?all=1', {
      next: { revalidate: 3600 }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const xmlText = await response.text()
    const feed = parseRSSXML(xmlText)

    return feed.items.map((item) => {
      const date = item.pubDate ? new Date(item.pubDate) : new Date()
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date)

      return {
        title: item.title,
        slug: item.link,
        thumbnail: '/zenn.svg',
        date: date.toISOString(),
        formattedDate,
        content: item.content
      }
    })
  } catch (error) {
    console.error('Failed to fetch Zenn RSS feed:', error)
    return []
  }
}
