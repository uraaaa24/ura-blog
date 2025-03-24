import type { ReactNode } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  language: string
  children: ReactNode
}

const NBCodeBlock = ({ language, children }: CodeBlockProps) => {
  return (
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
      language={language}
      PreTag="div"
      wrapLines={true}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

export default NBCodeBlock
