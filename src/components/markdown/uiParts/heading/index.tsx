import { Link } from 'lucide-react'
import React, { ComponentProps, ElementType } from 'react'

import { cx } from '@/utils'

type HeadingLevel = 'h2' | 'h3' | 'h4'

type HeadingProps = {
  level: HeadingLevel
} & ComponentProps<HeadingLevel>

const HEADING_STYLES: Record<HeadingLevel, string> = {
  h2: 'py-4 pb-2 text-3xl border-b-2 border-red-500 dark:border-red-700',
  h3: 'py-3 text-2xl',
  h4: 'py-2 text-xl'
}

export const Heading = ({ level, children, className, ...props }: HeadingProps) => {
  const Component = level as ElementType
  const id = String(children)

  return (
    <Component
      className={cx('font-bold flex items-center group', HEADING_STYLES[level], className)}
      id={id}
      {...props}
    >
      {children}
      {id && (
        <a
          aria-label={`Link to ${id}`}
          className="ml-1 text-gray-500 opacity-0 transition duration-200 hover:text-gray-700 group-hover:opacity-100 dark:text-gray-400 dark:hover:text-gray-200"
          href={`#${id}`}
        >
          <Link size={18} />
        </a>
      )}
    </Component>
  )
}
