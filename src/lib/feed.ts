import type { Post } from './post'

import { BASE_URL } from './envs'

/**
 * RSS 2.0フィードを生成
 */
export function generateRSSFeed(posts: Post[]): string {
  const buildDate = new Date().toUTCString()

  const rssItems = posts
    .map((post) => {
      const postUrl = `${BASE_URL}/posts/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt || `${post.title}について書いた記事です。`}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Uralog</title>
    <link>${BASE_URL}</link>
    <description>Uralogは、フロントエンド開発やプログラミングを中心に、興味のあることを気ままに記録する個人ブログです。</description>
    <language>ja</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`
}

/**
 * Atom 1.0フィードを生成
 */
export function generateAtomFeed(posts: Post[]): string {
  const updatedDate = new Date().toISOString()

  const atomEntries = posts
    .map((post) => {
      const postUrl = `${BASE_URL}/posts/${post.slug}`
      const published = new Date(post.date).toISOString()

      return `
  <entry>
    <title>${post.title}</title>
    <link href="${postUrl}" />
    <id>${postUrl}</id>
    <updated>${published}</updated>
    <published>${published}</published>
    <summary type="html"><![CDATA[${post.excerpt || `${post.title}について書いた記事です。`}]]></summary>
    <author>
      <name>Ura</name>
    </author>
    ${post.tags ? post.tags.map((tag) => `<category term="${tag}"/>`).join('\n    ') : ''}
  </entry>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Uralog</title>
  <link href="${BASE_URL}" />
  <link href="${BASE_URL}/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${BASE_URL}</id>
  <updated>${updatedDate}</updated>
  <subtitle>Uralogは、フロントエンド開発やプログラミングを中心に、興味のあることを気ままに記録する個人ブログです。</subtitle>
  <author>
    <name>Ura</name>
    <uri>${BASE_URL}</uri>
  </author>
  ${atomEntries}
</feed>`
}
