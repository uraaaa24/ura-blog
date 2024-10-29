import React, { ComponentProps } from 'react'

type TagProps = {} & ComponentProps<'div'>

const Tag = ({ className = '', ...props }: TagProps) => {
  return (
    <div
      {...props}
      className={`inline-block rounded-full bg-[#728d81] px-2.5 py-2 text-xs text-[#ffffff] ${className}`}
    />
  )
}

export default Tag
