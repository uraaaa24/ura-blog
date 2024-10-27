import React, { ComponentProps } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type CodeProps = ComponentProps<'code'>

const Code = ({ children, className = '', ...props }: CodeProps) => {
  const isInline = !/language-(\w+)/.test(className)
  const language = className.replace(/language-/, '')

  return isInline ? (
    <code {...props} className={className}>
      {children}
    </code>
  ) : (
    <SyntaxHighlighter
      customStyle={{
        padding: '1.5em',
        borderRadius: '0.75em'
      }}
      language={language}
      style={oneDark}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

export default Code
