'use client'

import { usePathname } from 'next/navigation'

import { navLinks } from '@/constants/nav-links'

import LinkItem from './link-item'

const Header = () => {
  const pathName = usePathname()

  return (
    <header>
      <nav className="bg-white py-2 px-6 mt-10 rounded-full w-fit mx-auto fixed top-0 left-0 right-0 z-10">
        <ul className="flex space-x-6">
          {navLinks.map(({ href, label, match }) => (
            <li key={href}>
              <LinkItem isActive={match(pathName)} href={href} label={label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
