'use client'

import { useLayoutEffect, useRef } from 'react'

import { usePathname, useSelectedLayoutSegment } from 'next/navigation'

import { navLinks } from '@/constants/nav-links'

import ThemeToggle from '@/components/ui/theme-toggle'
import LinkItem from './link-item'

const resetScrollPosition = () => {
  const root = document.documentElement
  const body = document.body
  const previousRootBehavior = root.style.scrollBehavior
  const previousBodyBehavior = body.style.scrollBehavior

  try {
    root.style.scrollBehavior = 'auto'
    body.style.scrollBehavior = 'auto'
    root.scrollTop = 0
    body.scrollTop = 0
  } finally {
    root.style.scrollBehavior = previousRootBehavior
    body.style.scrollBehavior = previousBodyBehavior
  }
}

const Header = () => {
  const pathname = usePathname()
  const activeSegment = useSelectedLayoutSegment()
  const previousPathname = useRef(pathname)

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return

    previousPathname.current = pathname
    resetScrollPosition()
  }, [pathname])

  const activeHref = activeSegment === null ? '/' : `/${activeSegment}`

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-10 mt-10 flex justify-center transition-all duration-300 ease-out">
        <ul className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md py-2 px-6 rounded-full flex items-center justify-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <LinkItem isActive={link.href === activeHref} href={link.href} label={link.label} />
            </li>
          ))}
          <li className="h-full flex items-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
