import React, { ComponentProps } from 'react'

import { cx } from '@/utils'

type TagProps = ComponentProps<'div'>

const Tag = ({ className = '', ...props }: TagProps) => {
  return (
    <div
      {...props}
      className={cx(
        `inline-block rounded-full px-3 py-1.5 text-xs font-medium text-white transition-colors bg-green-600`,
        className
      )}
    />
  )
}

export default Tag
