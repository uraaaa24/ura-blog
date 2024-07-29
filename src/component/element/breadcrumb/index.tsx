'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { ICON_SIZE } from '@/constant/icon'
import { useTagContext } from '@/context/tagContext'

type BreadcrumbItem = {
  label: string
  href?: string
}

const Breadcrumb = () => {
  const { selectedTag } = useTagContext()

  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', href: '/articles' }, { label: selectedTag.name }]

  return (
    <nav>
      <ul className="flex items-center gap-1 break-words text-xl py-2">
        {breadcrumbItems.map((item, index) => {
          return (
            <li key={index}>
              {!item.href || index === breadcrumbItems.length - 1 ? (
                <p>{item.label}</p>
              ) : (
                <div className="flex gap-1 items-center">
                  <Link href={item.href} className="hover:text-[#e30613] transition-all duration-300">
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
