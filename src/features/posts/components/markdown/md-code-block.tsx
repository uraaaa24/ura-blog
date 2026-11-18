import type { ReactNode } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import CodeCopyButton from './code-copy-button'

type CodeBlockProps = {
  className?: string
  children: ReactNode
}

const MDCodeBlock = ({ className, children, ...props }: CodeBlockProps) => {
  const matchCode = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')

  return matchCode ? (
    <div className="group relative">
      <CodeCopyButton code={code} />
      <SyntaxHighlighter
        style={{
          ...oneDark,
          'code[class*="language-"]': {
            color: '#f3f4f6',
            fontSize: '0.875rem',
            lineHeight: '1.5rem'
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
        wrapLines
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code
      className={`${className} rounded-md bg-gray-200 px-1 py-0.5 dark:bg-gray-700 dark:text-gray-200`}
      {...props}
    >
      {children}
    </code>
  )
}

export default MDCodeBlock
