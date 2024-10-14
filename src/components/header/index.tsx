import React from 'react'

import LayoutWrapper from '@/components/layoutWrapper'
import Link from 'next/link'

// TODO: ページ構成がはっきりしたら、ヘッダーのデザインを考える
const Header = () => {
  return (
    <div className="fixed flex h-20 w-full items-center backdrop-blur-sm">
      <LayoutWrapper>
        <div className="flex justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold">Ura Blog</h1>
          </Link>
          <div className="flex gap-6">
            <Link href="/about">About</Link>
            <Link href="/articles">Article</Link>
            <Link href="/scraps">Scrap</Link>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  )
}

export default Header
