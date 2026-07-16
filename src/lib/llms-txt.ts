import { BASE_URL } from './envs'

type LLMPost = {
  href: string
  title: string
  excerpt?: string
}

/**
 * llms.txt形式のコンテンツを生成
 * LLMがウェブサイトのコンテンツを理解しやすくするための標準フォーマット
 */
export function generateLLMSTxt(posts: LLMPost[]): string {
  const currentDate = new Date().toISOString().split('T')[0]

  // 最新の記事（最大10件）
  const recentPosts = posts
    .slice(0, 10)
    .map((post) => {
      const url = new URL(post.href, BASE_URL).toString()
      const description = post.excerpt || post.title
      return `- ${url}: ${description}`
    })
    .join('\n')

  return `# Gana

GanaがReact、Next.js、TypeScriptを中心に、フロントエンド開発や日々の学びを記録する個人ブログです。

> Author: Gana
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

- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS
- Content: Markdown with frontmatter
- Features: Dark mode, RSS feed, Search

# Feeds

- RSS: ${BASE_URL}/feed.xml
- Atom: ${BASE_URL}/atom.xml

# Sitemap

- Sitemap: ${BASE_URL}/sitemap.xml

# Contact & Social

- GitHub: https://github.com/gananana24
- X (Twitter): https://twitter.com/____gana24
- Zenn: https://zenn.dev/uraaaa24
`
}
