import type { Post } from './post'

import { BASE_URL } from './envs'

/**
 * llms.txt形式のコンテンツを生成
 * LLMがウェブサイトのコンテンツを理解しやすくするための標準フォーマット
 */
export function generateLLMSTxt(posts: Post[]): string {
  const currentDate = new Date().toISOString().split('T')[0]

  // 最新の記事（最大10件）
  const recentPosts = posts
    .slice(0, 10)
    .map((post) => {
      const url = `${BASE_URL}/posts/${post.slug}`
      const description = post.excerpt || post.title
      return `- ${url}: ${description}`
    })
    .join('\n')

  return `# Uralog

フロントエンド開発やプログラミングを中心に、興味のあることを気ままに記録する個人ブログです。

> Author: Ura
> Language: Japanese
> Last Updated: ${currentDate}

# Main Pages

- ${BASE_URL}: ホームページ - 最新の記事一覧
- ${BASE_URL}/about: Aboutページ - ブログの著者について
- ${BASE_URL}/posts: Posts一覧 - 全記事の一覧

# Recent Blog Posts

${recentPosts}

# Content Categories

- フロントエンド開発
- プログラミング
- Web開発
- JavaScript/TypeScript
- React/Next.js

# Technical Details

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- Content: Markdown with frontmatter
- Features: Dark mode, RSS feed, Search

# Feeds

- RSS: ${BASE_URL}/feed.xml
- Atom: ${BASE_URL}/atom.xml

# Sitemap

- Sitemap: ${BASE_URL}/sitemap.xml

# Contact & Social

- GitHub: https://github.com/uraaaa24
- X (Twitter): https://twitter.com/__ars____24
- Zenn: https://zenn.dev/uraaaa24
`
}
