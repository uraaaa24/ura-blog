import React, { ComponentProps } from 'react'

type HrProps = ComponentProps<'hr'>

export const Hr = ({ ...props }: HrProps) => {
  return <hr {...props} className="my-8 border-red-200 dark:border-red-800" />
}
