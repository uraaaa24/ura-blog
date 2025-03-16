import type { ReactNode } from 'react'

type MDParagraphProps = {
  children: ReactNode
}

const MDParagraph = ({ children }: MDParagraphProps) => {
  return <p className="leading-8 mb-8">{children}</p>
}

export default MDParagraph
