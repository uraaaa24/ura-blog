import React, { ReactNode } from 'react'

type BlogWrapperProps = {
  children: ReactNode
}

const BlogWrapper = ({ children }: BlogWrapperProps) => {
  return <div className="mx-auto w-6/12">{children}</div>
}

export default BlogWrapper
