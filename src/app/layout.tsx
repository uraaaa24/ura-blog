import type { ReactNode } from 'react'

import { GoogleTagManager } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import { cookies } from 'next/headers'

import type { Metadata } from 'next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { GA_MEASUREMENT_ID } from '@/lib/envs'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'

const roboto = Roboto({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Uralog',
  description:
    'Uralogは、フロントエンド開発やプログラミングを中心に、興味のあることを気ままに記録する個人ブログです。'
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value

  return (
    <html lang="ja" className="dark" suppressHydrationWarning>
      <GoogleTagManager gtmId={GA_MEASUREMENT_ID} />
      <body
        className={`${roboto.className} 
          bg-[#f7f7f7] dark:bg-[#1a1a1a]
          text-gray-900 dark:text-gray-100
          leading-8 min-h-screen flex flex-col
          transition-colors duration-300
        `}
      >
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
