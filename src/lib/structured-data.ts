import { SOCIAL_LINKS } from '@/constants/sns'
import { BASE_URL } from './envs'
import type { Post } from './post'

/**
 * 記事用の構造化データ (Article) を生成
 */
export function generateArticleStructuredData(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || `${post.title}について書いた記事です。`,
    image: post.thumbnail || `${BASE_URL}/ura-icon.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Ura',
      url: BASE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'Uralog',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/ura-icon.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/posts/${post.slug}`
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
    name: 'Uralog',
    description:
      'React、Next.js、TypeScriptを使ったフロントエンド開発の技術記事やプログラミングに関する知識を発信するエンジニアブログです。',
    url: BASE_URL,
    author: {
      '@type': 'Person',
      name: 'Ura',
      url: BASE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'Uralog',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/ura-icon.png`
      }
    },
    image: `${BASE_URL}/api/og`,
    sameAs: [SOCIAL_LINKS.github.href, SOCIAL_LINKS.zenn.href, SOCIAL_LINKS.x.href],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/posts?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
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
