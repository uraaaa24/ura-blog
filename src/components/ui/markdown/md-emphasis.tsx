import type { ReactNode } from 'react'

type MDEmphasisProps = {
  children: ReactNode
}

const MDEmphasis = ({ children }: MDEmphasisProps) => {
  return <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
}

export default MDEmphasis
