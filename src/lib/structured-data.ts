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
    keywords: post.tags?.join(', ')
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
      'Uralogは、フロントエンド開発やプログラミングを中心に、興味のあることを気ままに記録する個人ブログです。',
    url: BASE_URL,
    author: {
      '@type': 'Person',
      name: 'Ura',
      url: BASE_URL
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/posts?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
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
