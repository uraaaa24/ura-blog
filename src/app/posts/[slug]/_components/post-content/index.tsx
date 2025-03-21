'use client'

import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import MDAnchor from './md-parts/md-anchor'
import MDBlockquote from './md-parts/md-blockquote'
import MDCodeBlock from './md-parts/md-codeBlock'
import { MDHeading2, MDHeading3 } from './md-parts/md-heading'
import MDHorizontalRule from './md-parts/md-horizontalRule'
import MDImage from './md-parts/md-image'
import { MDListItem, MDOrderedList, MDUnorderedList } from './md-parts/md-list'
import MDParagraph from './md-parts/md-paragraph'
import {
  MDTable,
  MDTableBody,
  MDTableCell,
  MDTableHead,
  MDTableHeadCell,
  MDTableRow
} from './md-parts/md-table'

import type { Components } from 'react-markdown'

const components: Components | null | undefined = {
  code: ({ className, children, ...props }) => (
    <MDCodeBlock className={className} {...props}>
      {children}
    </MDCodeBlock>
  ),
  h2: ({ children }) => <MDHeading2>{children}</MDHeading2>,
  h3: ({ children }) => <MDHeading3>{children}</MDHeading3>,
  p: ({ children }) => <MDParagraph>{children}</MDParagraph>,
  table: ({ children }) => <MDTable>{children}</MDTable>,
  tbody: ({ children }) => <MDTableBody>{children}</MDTableBody>,
  tr: ({ children }) => <MDTableRow>{children}</MDTableRow>,
  thead: ({ children }) => <MDTableHead>{children}</MDTableHead>,
  th: ({ children }) => <MDTableHeadCell>{children}</MDTableHeadCell>,
  td: ({ children }) => <MDTableCell>{children}</MDTableCell>,
  ul: ({ children }) => <MDUnorderedList>{children}</MDUnorderedList>,
  ol: ({ children }) => <MDOrderedList>{children}</MDOrderedList>,
  li: ({ children }) => <MDListItem>{children}</MDListItem>,
  img: ({ src, alt }) => <MDImage src={src} alt={alt} />,
  hr: () => <MDHorizontalRule />,
  a: ({ children, href, ...props }) => (
    <MDAnchor href={href} {...props}>
      {children}
    </MDAnchor>
  ),
  blockquote: ({ children }) => <MDBlockquote>{children}</MDBlockquote>
}

type PostContentProps = {
  content: string
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  )
}

export default PostContent
