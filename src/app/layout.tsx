import type { ReactNode } from 'react'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import AgentTools from '@/components/agent-tools'
import { getPosts } from '@/features/posts/server/posts'

import { BASE_URL, GA_MEASUREMENT_ID, GOOGLE_SITE_VERIFICATION } from '@/lib/envs'
import { generateWebSiteStructuredData } from '@/lib/structured-data'
import { ThemeProvider } from '@/providers/theme-provider'

import type { Metadata } from 'next'

import '@/styles/globals.css'

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const siteDescription =
  'uraがReact、Next.js、TypeScriptを中心に、フロントエンド開発や日々の学びを記録する個人ブログです。'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ura's notes",
    template: "%s | ura's notes"
  },
  description: siteDescription,
  keywords: [
    'React',
    'Next.js',
    'TypeScript',
    'フロントエンド開発',
    'Web開発',
    'プログラミング',
    'エンジニアブログ',
    'JavaScript',
    'TailwindCSS',
    '技術ブログ'
  ],
  authors: [{ name: 'ura' }],
  creator: 'ura',
  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': '/feed.xml',
      'application/atom+xml': '/atom.xml'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: BASE_URL,
    siteName: "ura's notes",
    title: "ura's notes",
    description: siteDescription,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "ura's notes"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "ura's notes",
    description: siteDescription,
    images: [`${BASE_URL}/opengraph-image`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION
  }
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const posts = await getPosts()
  const articles = posts
    .filter((post) => post.source !== 'local' || !post.isDraft)
    .map(({ title, href, excerpt, tags }) => ({
      title,
      href: new URL(href, BASE_URL).toString(),
      excerpt,
      tags
    }))
  // サイト全体の構造化データ
  const webSiteStructuredData = generateWebSiteStructuredData()

  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      </head>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <body
        className={`${inter.className}
          bg-[#f7f7f7] dark:bg-[#1a1a1a]
          text-gray-900 dark:text-gray-100
          leading-8 min-h-screen flex flex-col
        `}
      >
        {/* サイト全体の構造化データ (JSON-LD) */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(webSiteStructuredData)}
        </Script>

        <AgentTools articles={articles} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
