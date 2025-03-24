import type { ReactNode } from 'react'

type NBListProps = {
  children: ReactNode
}

export const NBUnorderedList = ({ children }: NBListProps) => {
  return (
    <ul className="list-disc pl-6 space-y-3 mb-6 [&_ul]:list-disc [&>li>ul]:my-2">{children}</ul>
  )
}

export const NBOrderedList = ({ children }: NBListProps) => {
  return <ol className="list-decimal pl-6 space-y-3 mb-6">{children}</ol>
}

export const NBListItem = ({ children }: NBListProps) => {
  return <li className="leading-8">{children}</li>
}
