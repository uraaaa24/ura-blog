import type { ReactNode } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '個人ブログサイト'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-[#f7f7f7] text-gray-700 leading-relaxed min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-32">
          <div className="container max-w-2xl mx-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
