'use client'

import { useLayoutEffect, useRef } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LinkItemProps = {
  isActive: boolean
  href: string
  label: string
}

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

const LinkItem = ({ isActive, href, label }: LinkItemProps) => {
  const pathName = usePathname()
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    resetScrollPosition()
  }, [pathName])

  return (
    <Link
      href={href}
      scroll={false}
      className={`
        font-medium transition-colors duration-200
        ${
          isActive
            ? 'text-gray-900 dark:text-gray-100 font-bold'
            : 'text-gray-400 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }
      `}
    >
      {label}
    </Link>
  )
}

export default LinkItem
