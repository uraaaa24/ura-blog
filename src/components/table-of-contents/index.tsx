'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { TocItem } from '@/lib/toc'

type TableOfContentsProps = {
  items: TocItem[]
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px'
      }
    )

    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean)

    for (const heading of headings) {
      if (heading) observer.observe(heading)
    }

    return () => {
      for (const heading of headings) {
        if (heading) observer.unobserve(heading)
      }
    }
  }, [items])

  if (items.length === 0) return null

  const listId = 'table-of-contents-list'

  return (
    <nav className="mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer flex w-full items-center justify-between text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      >
        <span className="inline-flex items-center gap-2">
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-300" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-300" aria-hidden="true" />
          )}
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">目次</h2>
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
        }`}
      >
        <ul id={listId} className="min-h-0 overflow-hidden space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'location' : undefined}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default TableOfContents
