import React, { ComponentProps } from 'react'

type HrProps = ComponentProps<'hr'>

export const Hr = ({ ...props }: HrProps) => {
  return <hr {...props} className="rounded-full border-red-200 dark:border-red-800" />
}
