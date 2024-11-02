import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Code, Heading, Hr } from './uiParts'

type MarkDownProps = {
  content: string
}

const components: Components = {
  h2: (props) => <Heading level="h2" {...props} />,
  h3: (props) => <Heading level="h3" {...props} />,
  h4: (props) => <Heading level="h4" {...props} />,
  code: (props) => <Code {...props} />,
  hr: (props) => <Hr {...props} />
}

const MarkDown = ({ content }: MarkDownProps) => {
  return (
    <ReactMarkdown className="space-y-4" components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  )
}

export default MarkDown
