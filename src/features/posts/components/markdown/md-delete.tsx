import type { ReactNode } from 'react'

type MDDeleteProps = {
  children: ReactNode
}

const MDDelete = ({ children }: MDDeleteProps) => {
  return <del className="text-gray-600 line-through opacity-75 dark:text-gray-400">{children}</del>
}

export default MDDelete
