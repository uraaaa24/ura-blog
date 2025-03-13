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
  title: 'My Blog',
  description: '個人ブログサイト'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body
        className={`${roboto.className} bg-[#f7f7f7] text-gray-700 leading-relaxed min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow py-32 px-6">
          <div className="container max-w-2xl mx-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
