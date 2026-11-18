'use client'

import { Check, Copy } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  className?: string
  children: ReactNode
}

const MDCodeBlock = ({ className, children, ...props }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const matchCode = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return matchCode ? (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 cursor-pointer rounded-lg bg-gray-700 p-2 opacity-0 transition-colors group-hover:opacity-100 hover:bg-gray-600 focus:opacity-100"
        aria-label={copied ? 'Code copied' : 'Copy code'}
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} className="text-gray-300" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Code copied' : ''}
      </span>
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
