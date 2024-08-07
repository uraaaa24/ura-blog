'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { ICON_SIZE } from '@/constant/icon'

type LabelItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  labelList: LabelItem[]
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const breadcrumbItems = [{ label: 'Blog', href: '/blog' }, ...props.labelList]

  return (
    <nav>
      <ul className="flex items-center gap-1 break-words">
        {breadcrumbItems.map((item, index) => {
          return (
            <li key={index}>
              {!item.href || index === breadcrumbItems.length - 1 ? (
                <p>{item.label}</p>
              ) : (
                <div className="flex gap-1 items-center">
                  <Link href={item.href} className="hover:text-primary transition-all duration-300">
                    {item.label}
                  </Link>
                  <ChevronRight size={ICON_SIZE.SMALL} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb
