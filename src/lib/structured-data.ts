import { SOCIAL_LINKS } from '@/constants/sns'

import { BASE_URL } from './envs'

type ArticleStructuredData = {
  href: string
  title: string
  publishedAt: string
  updatedAt?: string
  excerpt?: string
  thumbnail: string | null
  tags?: string[]
}

/**
 * 記事用の構造化データ (Article) を生成
 */
export function generateArticleStructuredData(post: ArticleStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || `${post.title}について書いた記事です。`,
    image: post.thumbnail || `${BASE_URL}/ura-icon.png`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'ura',
      url: BASE_URL,
      image: `${BASE_URL}/ura-icon.png`,
      sameAs: [SOCIAL_LINKS.github.href, SOCIAL_LINKS.zenn.href, SOCIAL_LINKS.x.href]
    },
    publisher: {
      '@type': 'Organization',
      name: "ura's notes",
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/ura-icon.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': new URL(post.href, BASE_URL).toString()
    },
    keywords: post.tags?.join(', '),
    inLanguage: 'ja-JP',
    articleSection: post.tags?.[0] || 'プログラミング'
  }
}

/**
 * ブログサイト用の構造化データ (WebSite) を生成
 */
export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "ura's notes",
    description:
      'uraがReact、Next.js、TypeScriptを中心に、フロントエンド開発や日々の学びを記録する個人ブログです。',
    url: BASE_URL,
    author: {
      '@type': 'Person',
      name: 'ura',
      url: BASE_URL,
      image: `${BASE_URL}/ura-icon.png`,
      sameAs: [SOCIAL_LINKS.github.href, SOCIAL_LINKS.zenn.href, SOCIAL_LINKS.x.href],
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'フロントエンド開発',
        'Web開発',
        'JavaScript',
        'TailwindCSS'
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: "ura's notes",
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/ura-icon.png`
      }
    },
    image: `${BASE_URL}/opengraph-image`,
    sameAs: [SOCIAL_LINKS.github.href, SOCIAL_LINKS.zenn.href, SOCIAL_LINKS.x.href],
    inLanguage: 'ja-JP',
    keywords: 'React, Next.js, TypeScript, フロントエンド開発, Web開発, プログラミング'
  }
}

/**
 * パンくずリストの構造化データ (BreadcrumbList) を生成
 */
export function generateBreadcrumbStructuredData(items: Array<{ label: string; href?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : undefined
    }))
  }
}
