import type { LiHTMLAttributes, ReactNode } from 'react'

type MDListProps = {
  children: ReactNode
}

export const MDUnorderedList = ({ children }: MDListProps) => {
  return (
    <ul className="list-disc pl-6 space-y-3 mb-6 [&_ul]:list-disc [&>li>ul]:my-2 [&_li:has(input[type=checkbox])]:list-none">
      {children}
    </ul>
  )
}

export const MDOrderedList = ({ children }: MDListProps) => {
  return <ol className="list-decimal pl-6 space-y-3 mb-6">{children}</ol>
}

type MDListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  children: ReactNode
}

export const MDListItem = ({ children, ...props }: MDListItemProps) => {
  return (
    <li
      className="leading-8 text-gray-800 dark:text-gray-200 [&>input[type=checkbox]]:mr-2 [&>input[type=checkbox]]:w-4 [&>input[type=checkbox]]:h-4 [&>input[type=checkbox]]:align-middle [&>input[type=checkbox]]:cursor-pointer [&>input[type=checkbox]]:accent-blue-600 [&:has(input[type=checkbox]:checked)]:text-gray-500 [&:has(input[type=checkbox]:checked)]:line-through [&:has(input[type=checkbox]:checked)]:dark:text-gray-500"
      {...props}
    >
      {children}
    </li>
  )
}
