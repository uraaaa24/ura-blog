'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Container from '@/component/layout/container'
import { notoSansJP700 } from '@/constant/font'
import { NAV_ITEMS } from '@/constant/header'

import NavItem from './navItem'

const Header = () => {
  const pathname = usePathname()

  return (
    <Container>
      <header className={`${notoSansJP700.className}`}>
        <div className="flex gap-10 py-4">
          <div>
            <Link href="/">
              <h1 className="text-2xl">Ura Blog</h1>
            </Link>
          </div>
          <nav className="flex items-center justify-between">
            <ul className="flex gap-8">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname?.startsWith(item.href)}
                />
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </Container>
  )
}

export default Header
