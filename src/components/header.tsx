'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathName = usePathname()

  const isHomePath = pathName === '/' || pathName.includes('/posts')

  return (
    <header className="bg-white p-3 mt-8 rounded-full w-fit mx-auto fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <nav className="mt-4 sm:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className={`font-medium  hover:text-gray-600 transition-colors
                ${isHomePath ? 'text-gray-700' : 'text-gray-400'}
                  `}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`font-medium  hover:text-gray-600 transition-colors
                ${!isHomePath ? 'text-gray-700' : 'text-gray-400'}
                  `}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
