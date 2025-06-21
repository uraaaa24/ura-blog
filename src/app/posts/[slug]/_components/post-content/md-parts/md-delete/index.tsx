import type { ReactNode } from 'react'

type MDDeleteProps = {
  children: ReactNode
}

const MDDelete = ({ children }: MDDeleteProps) => {
  return <del className="line-through opacity-75">{children}</del>
}

export default MDDelete