'use client'

import { Fragment } from 'react'

import MDAnchor from './md-parts/md-anchor'
import MDBlockquote from './md-parts/md-blockquote'
import MDCodeBlock from './md-parts/md-codeBlock'
import { MDHeading2, MDHeading3 } from './md-parts/md-heading'
import MDHorizontalRule from './md-parts/md-horizontalRule'
import MDImage from './md-parts/md-image'
import { MDListItem } from './md-parts/md-list'
import MDParagraph from './md-parts/md-paragraph'

type PostContentProps = {
  content: any[]
}

const RichTextSpan = ({ text }: { text: any }) => {
  const {
    annotations: { bold, italic, underline, strikethrough, code, color },
    text: { content, link }
  } = text

  let element = <span>{content}</span>

  if (link) element = <MDAnchor href={link.url}>{content}</MDAnchor>
  if (code) element = <code className="bg-gray-200 px-1 py-0.5 rounded-md text-sm">{element}</code>
  if (bold) element = <strong>{element}</strong>
  if (italic) element = <em>{element}</em>
  if (strikethrough) element = <s>{element}</s>
  if (underline) element = <u>{element}</u>

  return <span className={color !== 'default' ? `text-${color}` : ''}>{element}</span>
}

const MentionCard = ({
  mention,
  index,
  fallback
}: {
  mention: any
  index: number
  fallback: any
}) => {
  const link = mention.link_mention

  if (!link) return fallback

  return (
    <a
      key={index}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-gray-300 rounded-lg transition-colors duration-200 overflow-hidden"
    >
      <div className="flex flex-row">
        {link.thumbnail_url && (
          <img
            src={link.thumbnail_url}
            alt={link.title}
            className="w-2/5 h-32 object-cover flex-shrink-0 hidden sm:block"
          />
        )}
        <div
          className={`p-4 flex flex-col justify-between ${
            link.thumbnail_url ? 'w-full sm:w-3/5' : 'w-full'
          }`}
        >
          <div>
            <div className="text-lg font-semibold line-clamp-1 mb-1">{link.title}</div>
            <div className="text-sm text-gray-600 line-clamp-1 whitespace-pre-wrap mb-4">
              {link.description}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            {link.icon_url && (
              <img src={link.icon_url} width={16} height={16} alt={link.link_provider || 'icon'} />
            )}
            <div className="text-xs text-gray-400 line-clamp-1">{link.href}</div>
          </div>
        </div>
      </div>
    </a>
  )
}

const renderRichText = (richText: any[]) => {
  const renderers: Record<string, (text: any, index: number) => React.ReactNode> = {
    text: (text, index) => <RichTextSpan key={`text-${index}`} text={text} />,
    mention: (text, index) => renderMention(text, index),
    default: (text, index) => {
      console.warn(`未対応の rich_text タイプ: ${text.type}`)
      return <span key={`unknown-${index}`}>{text.plain_text ?? '[不明なテキスト]'}</span>
    }
  }

  return richText.map((text, index) => {
    const renderer = renderers[text.type] || renderers.default
    return renderer(text, index)
  })
}

const renderMention = (text: any, index: number) => {
  const mention = text.mention
  const href = text.href || text.plain_text

  const fallback = (
    <MDAnchor key={`fallback-${index}`} href={href}>
      {text.plain_text}
    </MDAnchor>
  )

  if (mention.type === 'link_mention') {
    return (
      <div key={`mention-${index}`} data-block>
        <MentionCard mention={mention} index={index} fallback={fallback} />
      </div>
    )
  }

  return fallback
}

const isBlockElement = (node: React.ReactNode) => {
  return (
    typeof node === 'object' &&
    node !== null &&
    'props' in node &&
    (node as any).props?.['data-block']
  )
}

const renderBlock = (block: any) => {
  const { type, id } = block
  const value = block[type]

  if (!value) return null

  const text = renderRichText(value.rich_text ?? [])

  switch (type) {
    case 'paragraph': {
      const children = renderRichText(value.rich_text ?? [])
      const inline: React.ReactNode[] = []
      const block: React.ReactNode[] = []

      children.forEach((node) => {
        if (isBlockElement(node)) {
          block.push(node)
        } else {
          inline.push(node)
        }
      })

      return (
        <Fragment key={id}>
          {inline.length > 0 && <MDParagraph>{inline}</MDParagraph>}
          {block}
        </Fragment>
      )
    }
    case 'heading_2':
      return <MDHeading2 key={id}>{text}</MDHeading2>
    case 'heading_3':
      return <MDHeading3 key={id}>{text}</MDHeading3>
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return <MDListItem key={id}>{text}</MDListItem>
    case 'code':
      return (
        <MDCodeBlock key={id} language={value.language}>
          {value.rich_text[0]?.text?.content ?? ''}
        </MDCodeBlock>
      )
    case 'quote':
      return <MDBlockquote key={id}>{text}</MDBlockquote>
    case 'image':
      return <MDImage key={id} src={value.file.url} alt={value.caption[0]?.plain_text ?? ''} />
    case 'to_do':
      return <MDListItem key={id}>{text}</MDListItem>
    case 'divider':
      return <MDHorizontalRule key={id} />
    default:
      console.warn(`未対応のブロックタイプ: ${type}`)
      console.log(value)
      return null
  }
}

const PostContent = ({ content }: PostContentProps) => {
  return <>{content.map((block) => renderBlock(block))}</>
}

export default PostContent
