import type { ReactNode } from 'react'

type HeadingProps = {
  children: ReactNode
}

export const Heading1 = ({ children }: HeadingProps) => {
  return <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">{children}</h1>
}

export const Heading2 = ({ children }: HeadingProps) => {
  return (
    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{children}</h2>
  )
}
