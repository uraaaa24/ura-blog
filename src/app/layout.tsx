import type { ReactNode } from 'react'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'
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
  'GanaがReact、Next.js、TypeScriptを中心に、フロントエンド開発や日々の学びを記録する個人ブログです。'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Gana',
    template: '%s | Gana'
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
  authors: [{ name: 'Gana' }],
  creator: 'Gana',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
      'application/atom+xml': '/atom.xml'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName: 'Gana',
    title: 'Gana',
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Gana'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gana',
    description: siteDescription,
    images: ['/opengraph-image']
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

const RootLayout = ({ children }: { children: ReactNode }) => {
  // サイト全体の構造化データ
  const webSiteStructuredData = generateWebSiteStructuredData()

  return (
    <html lang="ja" suppressHydrationWarning>
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

        <ThemeProvider>
          <Header />
          <main className="flex grow flex-col px-6 pt-32">
            <div className="container mx-auto flex w-full max-w-2xl grow flex-col">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
