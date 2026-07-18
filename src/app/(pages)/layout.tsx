import type { ReactNode } from 'react'

import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'

const PagesLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className="flex grow flex-col px-6 pt-32">
      <div className="container mx-auto flex w-full max-w-2xl grow flex-col">{children}</div>
    </main>
    <Footer />
  </>
)

export default PagesLayout
