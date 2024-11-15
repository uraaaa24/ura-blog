'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cx } from '@/utils'

type HeaderLinkProps = {
  label: string
}

const HeaderLink = ({ label }: HeaderLinkProps) => {
  const href = `/${label.toLowerCase()}`
  const pathname = usePathname()

  return (
    <Link
      className={cx(
        'transition-colors hover:text-red-600',
        href === pathname ? 'text-red-600' : ''
      )}
      href={href}
    >
      {label}
    </Link>
  )
}

export default HeaderLink
