import Footer from '@/components/footer'
import Header from '@/components/header'

import { NotoSansJP } from '@/constants/font'

import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Ura Blog',
  description: 'A blog to share insights and knowledge'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body
        className={`${NotoSansJP.className} flex min-h-screen flex-col bg-white text-[#4b4b4b] dark:bg-gray-900 dark:text-gray-200`}
      >
        <Header />
        <main className="container mx-auto my-4 w-11/12 max-w-4xl grow px-4 md:w-3/4 lg:w-2/3">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
