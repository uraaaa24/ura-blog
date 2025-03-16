'use client'

import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import MDAnchor from './mdParts/mdAnchor'
import MDBlockquote from './mdParts/mdBlockquote'
import MDCodeBlock from './mdParts/mdCodeBlock'
import { MDHeading2, MDHeading3 } from './mdParts/mdHeading'
import MDHorizontalRule from './mdParts/mdHorizontalRule'
import MDImage from './mdParts/mdImage'
import { MDListItem, MDOrderedList, MDUnorderedList } from './mdParts/mdList'
import MDParagraph from './mdParts/mdParagraph'
import {
  MDTable,
  MDTableBody,
  MDTableCell,
  MDTableHead,
  MDTableHeadCell,
  MDTableRow
} from './mdParts/mdTable'

type PostContentProps = {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
      components={{
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
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
