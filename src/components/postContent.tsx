'use client'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

type PostContentProps = {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                // @ts-expect-error - `tomorrow` is a valid style
                style={{
                  ...tomorrow,
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
                    overflow: 'auto'
                  }
                }}
                language={match[1]}
                PreTag="div"
                wrapLines={true}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} bg-gray-100 px-1 py-0.5 rounded`} {...props}>
                {children}
              </code>
            )
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
