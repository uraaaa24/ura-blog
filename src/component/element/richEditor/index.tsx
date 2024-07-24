import parse, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { ReactElement } from 'react'

import RichBlockquote from '@/component/element/richEditor/richTextElement/richBlockquote'
import {
  RichHeading1,
  RichHeading2,
  RichHeading3,
  RichHeading4
} from '@/component/element/richEditor/richTextElement/richHeading'
import RichImage from '@/component/element/richEditor/richTextElement/richImage'
import RichLink from '@/component/element/richEditor/richTextElement/richLink'
import { RichOrderList, RichUnorderedList } from '@/component/element/richEditor/richTextElement/richList'
import RichListItem from '@/component/element/richEditor/richTextElement/richListItem'
import RichParagraph from '@/component/element/richEditor/richTextElement/richParagraph'
import {
  RichTable,
  RichTableBody,
  RichTableData,
  RichTableHeader,
  RichTableRow
} from '@/component/element/richEditor/richTextElement/richTable'

import RichCode from './richTextElement/richCode'
import RichPerformedText from './richTextElement/richPreformattedText'
import RichStrong from './richTextElement/richStrong'
import RichUnderLine from './richTextElement/richUnderLine'

type RichEditorProps = {
  body: string
}

/**
 * DOMNodeがElementかどうかを判定する
 * @see https://github.com/remarkablemark/html-react-parser/issues/221#issuecomment-784073240
 * 参照日: 2024-07-07
 */
const isElement = (domNode: DOMNode): domNode is Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  const isTag = domNode.type === 'tag'
  const hasAttributes = (domNode as Element).attribs !== undefined

  return isTag && hasAttributes
}

/**
 * HTMLタグに応じてReactコンポーネントを返す
 */
const options: HTMLReactParserOptions = {
  replace: (domNode): ReactElement | undefined => {
    if (isElement(domNode)) {
      const { name, children, attribs, parent } = domNode
      const id = attribs.id

      const renderedChildren = domToReact(children as DOMNode[], options)

      switch (name) {
        case 'h1':
          return <RichHeading1 id={id}>{renderedChildren}</RichHeading1>
        case 'h2':
          return <RichHeading2 id={id}>{renderedChildren}</RichHeading2>
        case 'h3':
          return <RichHeading3 id={id}>{renderedChildren}</RichHeading3>
        case 'h4':
          return <RichHeading4 id={id}>{renderedChildren}</RichHeading4>
        case 'p':
          return <RichParagraph>{renderedChildren}</RichParagraph>
        case 'strong':
          return <RichStrong>{renderedChildren}</RichStrong>
        case 's':
          return <s>{renderedChildren}</s>
        case 'u':
          return <RichUnderLine>{renderedChildren}</RichUnderLine>
        case 'ul':
          return <RichUnorderedList>{renderedChildren}</RichUnorderedList>
        case 'ol':
          return <RichOrderList>{renderedChildren}</RichOrderList>
        case 'li':
          return <RichListItem>{renderedChildren}</RichListItem>
        case 'a':
          return <RichLink href={attribs.href}>{renderedChildren}</RichLink>
        case 'blockquote':
          return <RichBlockquote>{renderedChildren}</RichBlockquote>
        case 'hr':
          return <hr className="my-8 border-gray-300" />
        case 'table':
          return <RichTable>{renderedChildren}</RichTable>
        case 'tbody':
          return <RichTableBody>{renderedChildren}</RichTableBody>
        case 'tr':
          return <RichTableRow>{renderedChildren}</RichTableRow>
        case 'td':
          return <RichTableData>{renderedChildren}</RichTableData>
        case 'th':
          return <RichTableHeader>{renderedChildren}</RichTableHeader>
        case 'code':
          return <RichCode>{renderedChildren}</RichCode>
        case 'pre': {
          const fileName = parent && 'attribs' in parent ? parent.attribs['data-filename'] : undefined
          const language = 'attribs' in children[0] ? children[0].attribs.class?.replace('language-', '') : undefined
          return (
            <RichPerformedText fileName={fileName} language={language}>
              {domToReact(children as DOMNode[])}
            </RichPerformedText>
          )
        }
        case 'img': {
          const { width, height, src, alt, caption } = attribs
          return (
            <RichImage
              src={src}
              alt={alt}
              width={parseInt(width, 10)}
              height={parseInt(height, 10)}
              caption={caption}
            />
          )
        }
        case 'br':
          return <br />

        default:
          console.log(`Unknown tag: ${name}`)
          return <>{renderedChildren}</>
      }
    }
    return undefined
  }
}

const RichEditor = (props: RichEditorProps) => {
  return (
    <div className="js-toc-content bg-white w-full max-w-3xl mx-auto px-4 pt-2 pb-8 sm:px-6 lg:px-8">
      <article className="prose prose-blue max-w-none">{parse(props.body, options)}</article>
    </div>
  )
}

export default RichEditor
