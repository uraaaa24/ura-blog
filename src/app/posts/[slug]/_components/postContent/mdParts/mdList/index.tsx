import type { ReactNode } from 'react'

type MDListProps = {
  children: ReactNode
}

export const MDUnorderedList = ({ children }: MDListProps) => {
  return (
    <ul className="list-disc pl-6 space-y-3 mb-8 [&_ul]:list-disc [&>li>ul]:my-2">{children}</ul>
  )
}

export const MDOrderedList = ({ children }: MDListProps) => {
  return <ol className="list-decimal pl-6 space-y-3 mb-8">{children}</ol>
}

export const MDListItem = ({ children }: MDListProps) => {
  return <li className="leading-8">{children}</li>
}
