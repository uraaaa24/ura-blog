import AboutContent from '@/features/about/components/about-content'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'React、Next.js、TypeScriptを使ったフロントエンド開発を中心に、Web開発の技術や知識を発信するエンジニアブログ。Uraについての紹介ページです。',
  openGraph: {
    title: 'About - Uralog',
    description:
      'React、Next.js、TypeScriptを使ったフロントエンド開発を中心に、Web開発の技術や知識を発信するエンジニアブログ。Uraについての紹介ページです。',
    type: 'website'
  },
  keywords: [
    'フロントエンド開発',
    'React',
    'Next.js',
    'TypeScript',
    'Web開発',
    'エンジニアブログ',
    'プログラミング'
  ]
}

const AboutPage = () => {
  return <AboutContent />
}

export default AboutPage
