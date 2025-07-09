'use client'

import { usePathname } from 'next/navigation'

import ThemeToggle from '../theme-toggle'
import LinkItem from './link-item'

import { navLinks } from '@/constants/nav-links'

const Header = () => {
  const pathName = usePathname()

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-10 mt-10 flex justify-center transition-all duration-300 ease-out">
        <ul className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md py-2 px-6 rounded-full flex items-center justify-center space-x-6">
          {navLinks.map(({ href, label, match }) => (
            <li key={href}>
              <LinkItem isActive={match(pathName)} href={href} label={label} />
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
