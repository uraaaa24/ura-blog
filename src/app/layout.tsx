import type { ReactNode } from 'react'

import { GoogleTagManager } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import Script from 'next/script'

import type { Metadata } from 'next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { GA_MEASUREMENT_ID } from '@/lib/envs'
import { generateWebSiteStructuredData } from '@/lib/structured-data'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'

const roboto = Roboto({
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Uralog',
    template: '%s | Uralog'
  },
  description:
    'React、Next.js、TypeScriptを使ったフロントエンド開発の技術記事やプログラミングに関する知識を発信するエンジニアブログです。Web開発の実践的なTipsや学びを共有しています。',
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
  authors: [{ name: 'Ura' }],
  creator: 'Ura',
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
      'application/atom+xml': '/atom.xml'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName: 'Uralog',
    title: 'Uralog',
    description:
      'React、Next.js、TypeScriptを使ったフロントエンド開発の技術記事やプログラミングに関する知識を発信するエンジニアブログです。'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uralog',
    description:
      'React、Next.js、TypeScriptを使ったフロントエンド開発の技術記事やプログラミングに関する知識を発信するエンジニアブログです。'
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
  }
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  // サイト全体の構造化データ
  const webSiteStructuredData = generateWebSiteStructuredData()

  return (
    <html lang="ja" className="dark" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      </head>
      <GoogleTagManager gtmId={GA_MEASUREMENT_ID} />
      <body
        className={`${roboto.className} 
          bg-[#f7f7f7] dark:bg-[#1a1a1a]
          text-gray-900 dark:text-gray-100
          leading-8 min-h-screen flex flex-col
          transition-colors duration-300
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

        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-32 px-6">
            <div className="container max-w-2xl mx-auto">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
