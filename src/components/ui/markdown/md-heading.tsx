import type { ReactNode } from 'react'

import { toHashHref, toHeadingId } from '@/lib/heading'

const headingClassName = (level: number) => {
  const base =
    'relative -ml-6 w-[calc(100%+1.5rem)] font-bold group text-gray-900 dark:text-gray-100'
  switch (level) {
    case 2:
      return `${base} text-2xl mt-14 mb-10`
    case 3:
      return `${base} text-xl mt-10 mb-6`
    case 4:
      return `${base} text-lg mt-8  mb-4`
    case 5:
      return `${base} text-base mt-6 mb-3`
    default:
      return `${base} text-sm mt-4 mb-2`
  }
}

type MDHeadingProps = {
  level: 2 | 3 | 4 | 5 | 6
  children: ReactNode
  id?: string
}

export const MDHeading = ({ level, children, id }: MDHeadingProps) => {
  const text = String(children)
  // rehype-slugから渡されたIDがあればそれを使う、なければ自分で生成
  const slug = id || toHeadingId(text)

  const Tag = `h${level}` as const

  return (
    <Tag id={slug} className={headingClassName(level)}>
      <a
        href={toHashHref(slug)}
        aria-label={`To heading: ${text}`}
        className="block pl-6 no-underline transition-opacity duration-200 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-gray-400 before:opacity-0 before:transition-opacity before:duration-200 before:content-['#'] hover:opacity-80 group-hover:before:opacity-100 group-focus-within:before:opacity-100 dark:before:text-gray-500"
      >
        {children}
      </a>
    </Tag>
  )
}
