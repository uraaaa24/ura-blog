import AboutContent from '@/features/about/components/about-content'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'React、Next.js、TypeScriptを中心にWeb開発を行うエンジニア、Ganaについての紹介ページです。',
  openGraph: {
    title: 'About - Gana',
    description:
      'React、Next.js、TypeScriptを中心にWeb開発を行うエンジニア、Ganaについての紹介ページです。',
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
