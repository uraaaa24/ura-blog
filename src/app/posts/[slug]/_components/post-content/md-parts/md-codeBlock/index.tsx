import type { ReactNode } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  className?: string
  children: ReactNode
}

const MDCodeBlock = ({ className, children, ...props }: CodeBlockProps) => {
  const matchCode = /language-(\w+)/.exec(className || '')

  return matchCode ? (
    <SyntaxHighlighter
      style={{
        ...oneDark,
        'code[class*="language-"]': {
          color: '#f3f4f6',
          fontSize: '0.9rem',
          lineHeight: '1'
        },
        'pre[class*="language-"]': {
          borderRadius: '1rem',
          border: '1px solid #4b5563',
          backgroundColor: '#374151',
          padding: '1.5rem',
          overflow: 'auto',
          marginBottom: '2rem'
        },
        '.table': {
          borderCollapse: 'collapse'
        }
      }}
      language={matchCode[1]}
      PreTag="div"
      wrapLines={true}
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code
      className={`${className} bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-1 py-0.5 rounded-md`}
      {...props}
    >
      {children}
    </code>
  )
}

export default MDCodeBlock
