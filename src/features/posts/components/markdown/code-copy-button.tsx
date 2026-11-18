'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

type CodeCopyButtonProps = {
  code: string
}

const CodeCopyButton = ({ code }: CodeCopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
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
    </>
  )
}

export default CodeCopyButton
