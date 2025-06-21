import type { ReactNode } from 'react'

type MDEmphasisProps = {
  children: ReactNode
}

const MDEmphasis = ({ children }: MDEmphasisProps) => {
  return <em className="italic">{children}</em>
}

export default MDEmphasis