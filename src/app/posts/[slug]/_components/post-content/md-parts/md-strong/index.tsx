import type { ReactNode } from 'react'

type MDStrongProps = {
  children: ReactNode
}

const MDStrong = ({ children }: MDStrongProps) => {
  return <strong className="font-bold">{children}</strong>
}

export default MDStrong