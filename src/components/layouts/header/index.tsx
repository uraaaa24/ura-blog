'use client'

import { usePathname } from 'next/navigation'

import { navLinks } from '@/constants/nav-links'

import ThemeToggle from '@/components/ui/theme-toggle'
import LinkItem from './link-item'

const isActivePath = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

const Header = () => {
  const pathname = usePathname()

  if (pathname.startsWith('/games')) return null

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-10 mt-10 flex justify-center transition-all duration-300 ease-out">
        <ul className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md py-2 px-6 rounded-full flex items-center justify-center space-x-6">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.href)

            return (
              <li key={link.href}>
                <LinkItem isActive={isActive} href={link.href} label={link.label} />
              </li>
            )
          })}
          <li className="h-full flex items-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
