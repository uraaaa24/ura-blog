export interface RssFeed {
  url: string
  name: string
  description: string
}

export const RSS_FEEDS: RssFeed[] = [
  // VOA Learning English - Various Categories
  {
    url: 'https://learningenglish.voanews.com/api/zkm-ql-vomx-tpej-rqi',
    name: 'VOA Learning English',
    description: 'General news articles'
  },
  {
    url: 'https://learningenglish.voanews.com/api/zmmpql-vomx-tpey-_q',
    name: 'VOA Health & Lifestyle',
    description: 'Health, lifestyle, and wellness'
  },
  {
    url: 'https://learningenglish.voanews.com/api/zmg_pl-vomx-tpeymtm',
    name: 'VOA Science & Technology',
    description: 'Science and technology news'
  },

  // Sports - English learning focused
  {
    url: 'https://feeds.bbci.co.uk/sport/football/rss.xml',
    name: 'BBC Sport Football',
    description: 'Football/Soccer news'
  },

  // Coffee
  {
    url: 'https://sprudge.com/feed',
    name: 'Sprudge',
    description: 'Coffee culture and news'
  },
  {
    url: 'https://www.perfectdailygrind.com/feed/',
    name: 'Perfect Daily Grind',
    description: 'Coffee industry news'
  }
]
