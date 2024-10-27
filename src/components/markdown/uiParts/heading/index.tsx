import React, { ComponentProps } from 'react'

import { cx } from '@/utils'

type HeadingLevel = 'h1' | 'h2' | 'h3'

type HeadingProps = {
  level: HeadingLevel
} & ComponentProps<HeadingLevel>

const HEADING_STYLES = {
  h1: 'text-4xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-bold'
}

const Heading = ({ level, children, className, ...props }: HeadingProps) => {
  const Component = level

  return (
    <Component {...props} className={cx(HEADING_STYLES[level], className)}>
      {children}
    </Component>
  )
}

export const Heading1 = (props: Omit<HeadingProps, 'level'>) => {
  console.log('props', props.children)

  return <Heading level="h1" {...props} />
}

export const Heading2 = (props: Omit<HeadingProps, 'level'>) => <Heading level="h2" {...props} />

export const Heading3 = (props: Omit<HeadingProps, 'level'>) => <Heading level="h3" {...props} />
