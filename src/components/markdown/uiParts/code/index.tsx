import React, { ComponentProps } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { cx } from '@/utils'

type CodeProps = ComponentProps<'code'>

export const Code = ({ children, className = '', ...props }: CodeProps) => {
  const isInline = !/language-(\w+)/.test(className)
  const language = className.replace(/language-/, '')

  return isInline ? (
    <code
      {...props}
      className={cx(
        'px-1 py-0.5 bg-gray-200 dark:bg-gray-800 text-red-500 text-sm rounded-md',
        className
      )}
    >
      {children}
    </code>
  ) : (
    <SyntaxHighlighter
      customStyle={{
        padding: '1.5em',
        borderRadius: '0.75em',
        fontSize: '0.8em',
        lineHeight: '1.75em'
      }}
      language={language}
      style={oneDark}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}
