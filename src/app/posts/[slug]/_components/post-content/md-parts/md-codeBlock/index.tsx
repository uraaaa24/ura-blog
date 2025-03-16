import type { ReactNode } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  className?: string
  children: ReactNode
}

const MDCodeBlock = ({ className, children, ...props }: CodeBlockProps) => {
  const matchCode = /language-(\w+)/.exec(className || '')

  return matchCode ? (
    <SyntaxHighlighter
      style={{
        ...prism,
        'code[class*="language-"]': {
          color: '#4b5563',
          fontSize: '0.9rem',
          lineHeight: '1'
        },
        'pre[class*="language-"]': {
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          backgroundColor: '#f3f4f6',
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
    <code className={`${className} bg-gray-200 px-1 py-0.5 rounded-md text-sm`} {...props}>
      {children}
    </code>
  )
}

export default MDCodeBlock
