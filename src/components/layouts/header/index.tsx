'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_ITEMS } from '@/constants/header'

import NavItem from './navItem'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b-2">
      <div className="container mx-auto flex gap-10 py-4">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">Ura Blog</h1>
          </Link>
        </div>

        <nav className="flex items-center justify-between">
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
