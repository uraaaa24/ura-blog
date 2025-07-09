import type { ReactNode } from 'react'

type MDBlockquoteProps = {
  children: ReactNode
}

const MDBlockquote = ({ children }: MDBlockquoteProps) => {
  return (
    <blockquote className="border-l-4 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 pl-6">{children}</blockquote>
  )
}

export default MDBlockquote
