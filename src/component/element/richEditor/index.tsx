import parse, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { ReactElement } from 'react'

import RichBlockquote from '@/component/element/richEditor/richHtmlComponent/richBlockquote'
import RichCode from '@/component/element/richEditor/richHtmlComponent/richCode'
import RichEmphasis from '@/component/element/richEditor/richHtmlComponent/richEmphasis'
import { RichHeading2, RichHeading3, RichHeading4 } from '@/component/element/richEditor/richHtmlComponent/richHeading'
import RichImage from '@/component/element/richEditor/richHtmlComponent/richImage'
import RichLink from '@/component/element/richEditor/richHtmlComponent/richLink'
import { RichOrderList, RichUnorderedList } from '@/component/element/richEditor/richHtmlComponent/richList'
import RichListItem from '@/component/element/richEditor/richHtmlComponent/richListItem'
import RichParagraph from '@/component/element/richEditor/richHtmlComponent/richParagraph'
import RichPerformedText from '@/component/element/richEditor/richHtmlComponent/richPreformattedText'
import RichStrong from '@/component/element/richEditor/richHtmlComponent/richStrong'
import {
  RichTable,
  RichTableBody,
  RichTableData,
  RichTableHeader,
  RichTableRow
} from '@/component/element/richEditor/richHtmlComponent/richTable'
import RichUnderLine from '@/component/element/richEditor/richHtmlComponent/richUnderLine'

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
        case 'em':
          return <RichEmphasis>{renderedChildren}</RichEmphasis>
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
          return <hr className="my-8 border-slate-400" />
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
          return <>{renderedChildren}</>
      }
    }
    return undefined
  }
}

const RichEditor = (props: RichEditorProps) => {
  return (
    <div className="js-toc-content w-full mx-auto">
      <article className="prose prose-blue max-w-none ">{parse(props.body, options)}</article>
    </div>
  )
}

export default RichEditor
