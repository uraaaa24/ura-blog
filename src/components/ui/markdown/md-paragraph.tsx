import type { ReactNode } from 'react'

type MDParagraphProps = {
  children: ReactNode
}

const MDParagraph = ({ children }: MDParagraphProps) => {
  return (
    <p className="leading-8 break-words whitespace-pre-wrap mb-6 text-gray-800 dark:text-gray-200">
      {children}
    </p>
  )
}

export default MDParagraph
