import { Link } from 'lucide-react'
import React, { ComponentProps } from 'react'

import { cx } from '@/utils'

type HeadingLevel = 'h2' | 'h3' | 'h4'

type HeadingProps = {
  level: HeadingLevel
} & ComponentProps<HeadingLevel>

const HEADING_STYLES = {
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl'
}

export const Heading = ({ level, children, className, ...props }: HeadingProps) => {
  const Component = level
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
