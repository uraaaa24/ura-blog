import type { ReactNode } from 'react'

type MDStrongProps = {
  children: ReactNode
}

const MDStrong = ({ children }: MDStrongProps) => {
  return <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>
}

export default MDStrong
