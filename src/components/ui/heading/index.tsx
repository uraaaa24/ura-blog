import type { ReactNode } from 'react'

type HeadingProps = {
  children: ReactNode
}

export const Heading1 = ({ children }: HeadingProps) => {
  return <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">{children}</h1>
}

export const Heading2 = ({ children }: HeadingProps) => {
  return (
    <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">{children}</h2>
  )
}
