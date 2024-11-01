import { findPackages } from 'find-packages'
import Link from 'next/link'
import React from 'react'

const Header = async () => {
  const packages = await findPackages('./')
  const { version } = packages[0].manifest

  return (
    <header className="sticky top-0 z-10 flex w-full items-center border-b-2 border-[#e5e5e5] bg-white/60 backdrop-blur-md dark:border-[#37464f] dark:bg-gray-800/60 dark:shadow-lg">
      <div className="container mx-auto flex h-20 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="flex items-center text-xl font-bold sm:text-2xl dark:text-white">
            Ura Blog
            {version && (
              <span className="ml-3 text-xs font-normal text-gray-500 sm:text-sm dark:text-gray-400">
                v{version}
              </span>
            )}
          </h1>
        </Link>
        <nav className="hidden gap-6 text-lg sm:flex">
          <Link
            className="transition-colors hover:text-red-600 dark:hover:text-red-700"
            href="/about"
          >
            About
          </Link>
          <Link
            className="transition-colors hover:text-red-600 dark:hover:text-red-700"
            href="/articles"
          >
            Articles
          </Link>
          {/* <Link
            className="transition-colors hover:text-red-600 dark:hover:text-red-700"
            href="/scraps"
          >
            Scraps
          </Link> */}
        </nav>
        {/* TODO: ハンバーガーメニューを実装する */}
        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button aria-label="Open Menu">
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
