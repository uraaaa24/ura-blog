import Footer from '@/components/footer'
import Header from '@/components/header'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '個人ブログサイト'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-[#f7f7f7] text-black min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-32">
          <div className="container max-w-3xl mx-auto px-4">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
