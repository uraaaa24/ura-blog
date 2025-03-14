import Parser from 'rss-parser'

export const getZennRssFeed = async () => {
  const feed = await new Parser().parseURL('https://zenn.dev/uraaaa24/feed?all=1')
  return feed.items.map((item) => {
    const date = item.pubDate ? new Date(item.pubDate) : new Date()
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return {
      title: item.title ?? '',
      slug: item.link ?? '',
      thumbnail: '/zenn.svg',
      date: item.pubDate ?? '',
      formattedDate,
      content: item.content ?? ''
    }
  })
}
