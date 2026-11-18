'use client'

import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'

import LinkItem from './link-item'
import ThemeToggle from '@/components/ui/theme-toggle'
import { navLinks } from '@/constants/nav-links'

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
    <header className="pt-10">
      <nav className="flex justify-center">
        <ul className="flex items-center justify-center space-x-6 rounded-full bg-white/80 px-6 py-2 backdrop-blur-md dark:bg-gray-800/80">
          {navLinks.map((link) => (
            <li key={link.href}>
              <LinkItem isActive={link.href === activeHref} href={link.href} label={link.label} />
            </li>
          ))}
          <li className="flex h-full items-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
