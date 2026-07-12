import { House } from 'lucide-react'
import Link from 'next/link'

import { navLinks } from '@/constants/nav-links'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-20 pb-10">
      <div className="container max-w-3xl mx-auto px-4 text-sm text-center text-gray-500 dark:text-gray-400">
        <nav aria-label="Footer navigation" className="mb-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={label === 'Home' ? label : undefined}
                  className="inline-flex min-h-6 items-center font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {label === 'Home' ? (
                    <House aria-hidden="true" size={17} strokeWidth={2.2} />
                  ) : (
                    label
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>© {currentYear} Gana. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
