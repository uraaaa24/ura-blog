import { jsx } from 'react/jsx-runtime'
import type { Components } from 'react-markdown'

import MDAnchor from './md-anchor'
import MDBlockquote from './md-blockquote'
import MDCodeBlock from './md-code-block'
import MDDelete from './md-delete'
import MDEmphasis from './md-emphasis'
import { MDHeading } from './md-heading'
import MDHorizontalRule from './md-horizontal-rule'
import MDImage from './md-image'
import { MDListItem, MDOrderedList, MDUnorderedList } from './md-list'
import MDParagraph from './md-paragraph'
import MDStrong from './md-strong'
import {
  MDTable,
  MDTableBody,
  MDTableCell,
  MDTableHead,
  MDTableHeadCell,
  MDTableRow
} from './md-table'

export const markdownComponents: Components = {
  code: ({ className, children, ...props }) => jsx(MDCodeBlock, { className, ...props, children }),
  h2: ({ children, id }) => jsx(MDHeading, { level: 2, id, children }),
  h3: ({ children, id }) => jsx(MDHeading, { level: 3, id, children }),
  h4: ({ children, id }) => jsx(MDHeading, { level: 4, id, children }),
  h5: ({ children, id }) => jsx(MDHeading, { level: 5, id, children }),
  h6: ({ children, id }) => jsx(MDHeading, { level: 6, id, children }),
  p: ({ children }) => jsx(MDParagraph, { children }),
  table: ({ children }) => jsx(MDTable, { children }),
  tbody: ({ children }) => jsx(MDTableBody, { children }),
  tr: ({ children }) => jsx(MDTableRow, { children }),
  thead: ({ children }) => jsx(MDTableHead, { children }),
  th: ({ children }) => jsx(MDTableHeadCell, { children }),
  td: ({ children }) => jsx(MDTableCell, { children }),
  ul: ({ children }) => jsx(MDUnorderedList, { children }),
  ol: ({ children }) => jsx(MDOrderedList, { children }),
  li: ({ children }) => jsx(MDListItem, { children }),
  img: ({ src, alt }) => jsx(MDImage, { src, alt }),
  hr: () => jsx(MDHorizontalRule, {}),
  a: ({ children, href, ...props }) => jsx(MDAnchor, { href, ...props, children }),
  blockquote: ({ children }) => jsx(MDBlockquote, { children }),
  strong: ({ children }) => jsx(MDStrong, { children }),
  em: ({ children }) => jsx(MDEmphasis, { children }),
  del: ({ children }) => jsx(MDDelete, { children })
}
