'use client'

import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { markdownComponents } from './markdown/markdown-components'

type PostContentProps = {
  content: string
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <div className="mx-auto w-full max-w-prose text-base leading-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default PostContent
