import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Code from './uiParts/code'
import { Heading1, Heading2, Heading3 } from './uiParts/heading'
import Hr from './uiParts/horizontalRule'

type MarkDownProps = {
  content: string
}

const components: Components = {
  h1: (props) => <Heading1 {...props} />,
  h2: (props) => <Heading2 {...props} />,
  h3: (props) => <Heading3 {...props} />,
  code: (props) => <Code {...props} />,
  hr: (props) => <Hr {...props} />
}

const MarkDown = ({ content }: MarkDownProps) => {
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  )
}

export default MarkDown
