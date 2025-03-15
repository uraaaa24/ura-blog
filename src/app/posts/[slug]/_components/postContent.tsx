'use client'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

type PostContentProps = {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              // @ts-expect-error - `prism` is a valid style
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
            <code className={`${className} bg-gray-200 px-1 py-0.5 rounded-md text-sm`} {...props}>
              {children}
            </code>
          )
        },
        h2: ({ children }) => (
          <h2 className="relative text-2xl font-bold mt-14 mb-10 w-fit" id={String(children)}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="relative text-xl font-semibold mt-10 mb-6 w-fit">{children}</h3>
        ),
        p: ({ children }) => <p className="leading-8 mb-8">{children}</p>,
        table: ({ children }) => (
          <table className="border-collapse border border-gray-300">{children}</table>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 bg-gray-100 p-4 text-left">{children}</th>
        ),
        td: ({ children }) => <td className="border border-gray-300 p-4">{children}</td>,
        ul: ({ children }) => (
          <ul className="list-disc pl-6 space-y-3 mb-8 [&_ul]:list-disc  [&>li>ul]:my-2">
            {children}
          </ul>
        ),
        ol: ({ children }) => <ol className="list-decimal pl-6 space-y-3 mb-8">{children}</ol>,
        img: ({ src, alt }) => (
          <img className="max-w-full h-auto" src={src || ''} alt={alt || ''} />
        ),
        hr: () => <hr className="border-gray-300 my-12 mx-auto w-4/5" />,
        a: ({ children, href, ...props }) => {
          const isHeading = href && href.startsWith('#')
          if (isHeading) {
            return (
              <a href={href} {...props}>
                {children}
              </a>
            )
          }

          return (
            <a href={href} className="text-blue-500 hover:underline transition-colors" {...props}>
              {children}
            </a>
          )
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 text-gray-500 border-gray-300 pl-6 mb-8">
            {children}
          </blockquote>
        )
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
