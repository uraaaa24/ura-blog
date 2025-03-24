'use client'

import React, { Fragment } from 'react'

import NBAnchor from './block-parts/nb-anchor'
import NBBlockquote from './block-parts/nb-blockquote'
import NBCodeBlock from './block-parts/nb-codeBlock'
import { NBHeading2, NBHeading3 } from './block-parts/nb-heading'
import NBHorizontalRule from './block-parts/nb-horizontalRule'
import NBImage from './block-parts/nb-image'
import { NBListItem } from './block-parts/nb-list'
import NBMentionCard from './block-parts/nb-mention-card'
import NBParagraph from './block-parts/nb-paragraph'
import RichText from './rich-text'

type PostContentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[]
}

/**
 * ノードがブロック要素かどうかを判定する
 */
const isBlockElement = (node: React.ReactNode): boolean =>
  typeof node === 'object' &&
  node !== null &&
  'props' in node &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(node as any).props['data-block']

/**
 * リッチテキスト配列を適切にレンダリングする
 */
const renderRichText = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  richText: any[]
): React.ReactNode[] =>
  richText.map((text, index) => {
    switch (text.type) {
      case 'text':
        return <RichText key={`text-${index}`} text={text} />
      case 'mention':
        return renderMention(text, index)
      default:
        console.warn(`未対応の rich_text タイプ: ${text.type}`)
        return <span key={`unknown-${index}`}>{text.plain_text ?? '[不明なテキスト]'}</span>
    }
  })

/**
 * メンションのレンダリング処理
 */
const renderMention = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any,
  index: number
) => {
  const { mention } = text
  const href = text.href || text.plain_text

  const fallback = (
    <NBAnchor key={`fallback-${index}`} href={href}>
      {text.plain_text}
    </NBAnchor>
  )

  if (mention.type === 'link_mention') {
    return (
      <div key={`mention-${index}`} data-block>
        <NBMentionCard mention={mention} index={index} fallback={fallback} />
      </div>
    )
  }
  return fallback
}

/**
 * ブロックごとに適切なコンポーネントを返す
 */
const renderBlock = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  block: any
): React.ReactNode => {
  const { type, id } = block
  const value = block[type]

  if (!value) return null

  switch (type) {
    case 'paragraph': {
      const children = renderRichText(value.rich_text ?? [])
      const inlineNodes: React.ReactNode[] = []
      const blockNodes: React.ReactNode[] = []

      children.forEach((node) => {
        if (isBlockElement(node)) {
          blockNodes.push(node)
        } else {
          inlineNodes.push(node)
        }
      })

      return (
        <Fragment key={id}>
          {inlineNodes.length > 0 && <NBParagraph>{inlineNodes}</NBParagraph>}
          {blockNodes}
        </Fragment>
      )
    }
    case 'heading_2': {
      const text = renderRichText(value.rich_text ?? [])
      return <NBHeading2 key={id}>{text}</NBHeading2>
    }
    case 'heading_3': {
      const text = renderRichText(value.rich_text ?? [])
      return <NBHeading3 key={id}>{text}</NBHeading3>
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
    case 'to_do': {
      const text = renderRichText(value.rich_text ?? [])
      return <NBListItem key={id}>{text}</NBListItem>
    }
    case 'code': {
      const codeContent = value.rich_text?.[0]?.text?.content || ''
      return (
        <NBCodeBlock key={id} language={value.language}>
          {codeContent}
        </NBCodeBlock>
      )
    }
    case 'quote': {
      const text = renderRichText(value.rich_text ?? [])
      return <NBBlockquote key={id}>{text}</NBBlockquote>
    }
    case 'image': {
      const src = value.file.url
      const alt = value.caption?.[0]?.plain_text ?? ''
      return <NBImage key={id} src={src} alt={alt} />
    }
    case 'divider':
      return <NBHorizontalRule key={id} />
    default:
      console.warn(`未対応のブロックタイプ: ${type}`)
      console.log(value)
      return null
  }
}

/**
 * 全体のコンテンツをレンダリングするメインコンポーネント
 */
const PostContent = ({ content }: PostContentProps) => {
  return <>{content.map(renderBlock)}</>
}

export default PostContent
