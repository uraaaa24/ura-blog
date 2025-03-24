import type { ReactNode } from 'react'

type NBParagraphProps = {
  children: ReactNode
}

const NBParagraph = ({ children }: NBParagraphProps) => {
  return <p className="leading-8 break-words whitespace-pre-wrap mb-6">{children}</p>
}

export default NBParagraph
