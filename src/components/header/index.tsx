import React from 'react'

import LayoutWrapper from '@/components/layoutWrapper'

// TODO: ページ構成がはっきりしたら、ヘッダーのデザインを考える
const Header = () => {
  return (
    <div className="fixed flex h-16 w-full items-center backdrop-blur-sm">
      <LayoutWrapper>
        <h1>Header</h1>
      </LayoutWrapper>
    </div>
  )
}

export default Header
