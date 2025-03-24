'use client'

import NBAnchor from '../block-parts/nb-anchor'

type RichTextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any
}

/**
 * リッチテキスト内のテキストを適切にレンダリングする
 */
const RichText = ({ text }: RichTextProps) => {
  const {
    annotations: { bold, italic, underline, strikethrough, code, color },
    text: { content, link }
  } = text

  let element = <span>{content}</span>

  if (link) {
    element = <NBAnchor href={link.url}>{content}</NBAnchor>
  }
  if (code) {
    element = <code className="bg-gray-200 px-1 py-0.5 rounded-md text-sm">{element}</code>
  }
  if (bold) {
    element = <strong>{element}</strong>
  }
  if (italic) {
    element = <em>{element}</em>
  }
  if (strikethrough) {
    element = <s>{element}</s>
  }
  if (underline) {
    element = <u>{element}</u>
  }

  return <span className={color !== 'default' ? `text-${color}` : ''}>{element}</span>
}

export default RichText
