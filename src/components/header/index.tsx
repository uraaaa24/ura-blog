'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathName = usePathname()

  return (
    <header>
      <nav className="bg-white py-2 px-6 mt-10 rounded-full w-fit mx-auto fixed top-0 left-0 right-0 z-10">
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className={`font-medium hover:text-gray-600 transition-colors ${pathName === '/' ? 'text-black font-bold' : 'text-gray-400'}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              className={`font-medium hover:text-gray-600 transition-colors ${pathName.startsWith('/posts') ? 'text-black font-bold' : 'text-gray-400'}`}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`font-medium hover:text-gray-600 transition-colors ${pathName === '/about' ? 'text-black font-bold' : 'text-gray-400'}`}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
