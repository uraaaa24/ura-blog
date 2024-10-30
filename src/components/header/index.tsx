import { findPackages } from 'find-packages'
import Link from 'next/link'
import React from 'react'

const Header = async () => {
  const packages = await findPackages('./')
  const { version } = packages[0].manifest

  return (
    <div className="sticky right-0 top-0 flex h-20 w-full items-center text-xl backdrop-blur-md">
      <div className="mx-auto flex w-1/2 justify-between">
        <Link href="/">
          <h1 className="flex items-center font-bold">
            Ura Blog
            {/* TODO: 試しにヘッダーに表示しているので、バージョンの表示箇所は後々ちゃんと考える。 */}
            <span className="ml-2 text-base font-normal">{version}</span>
          </h1>
        </Link>
        <div className="flex gap-6">
          <Link href="/about">About</Link>
          <Link href="/articles">Article</Link>
          <Link href="/scraps">Scrap</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
