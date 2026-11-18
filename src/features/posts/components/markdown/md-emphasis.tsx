import type { ReactNode } from 'react'

type MDEmphasisProps = {
  children: ReactNode
}

const MDEmphasis = ({ children }: MDEmphasisProps) => {
  return <em className="text-gray-800 italic dark:text-gray-200">{children}</em>
}

export default MDEmphasis
