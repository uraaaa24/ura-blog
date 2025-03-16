import type { ReactNode } from 'react'

type MDBlockquoteProps = {
  children: ReactNode
}

const MDBlockquote = ({ children }: MDBlockquoteProps) => {
  return (
    <blockquote className="border-l-4 text-gray-500 border-gray-300 pl-6 mb-8">
      {children}
    </blockquote>
  )
}

export default MDBlockquote
