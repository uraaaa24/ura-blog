import type { ReactNode } from 'react'

import { Roboto } from 'next/font/google'

import Footer from '@/components/footer'
import Header from '@/components/header'

import type { Metadata } from 'next'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Ura Blog',
  description: '個人ブログサイト'
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
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
