import type { ReactNode } from 'react'

type MDBlockquoteProps = {
  children: ReactNode
}

const NBBlockquote = ({ children }: MDBlockquoteProps) => {
  return (
    <blockquote className="border-l-4 text-gray-500 border-gray-300 pl-6">{children}</blockquote>
  )
}

export default NBBlockquote
