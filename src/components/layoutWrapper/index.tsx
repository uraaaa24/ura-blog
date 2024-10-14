import React, { ReactNode } from 'react'

type LayoutWrapperProps = {
  children: ReactNode
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return <div className="mx-auto w-1/2">{children}</div>
}

export default LayoutWrapper
