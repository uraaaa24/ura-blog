import type { ReactNode } from 'react'

import { GoogleTagManager } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'

import type { Metadata } from 'next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { GA_MEASUREMENT_ID } from '@/lib/envs'

import './globals.css'

const roboto = Roboto({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Uralog',
  description:
    'Uralogは、フロントエンド開発やプログラミングを中心に、興味のあることを気ままに記録する個人ブログです。'
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <GoogleTagManager gtmId={GA_MEASUREMENT_ID} />
      <body
        className={`${roboto.className} bg-[#f7f7f7] leading-8 text-gray-700 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow pt-32 px-6">
          <div className="container max-w-2xl mx-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
