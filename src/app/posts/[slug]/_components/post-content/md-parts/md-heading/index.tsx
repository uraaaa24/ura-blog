import type { ReactNode } from 'react'

/**
 * 見出しテキスト → URL-safe な slug を生成
 * NFC正規化で日本語の濁点・半濁点を結合状態に統一し、記号類を除外
 */
const toSlug = (src: string) => {
  return src
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s-]+/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

const headingClassName = (level: number) => {
  const base = 'relative font-bold w-fit group'
  switch (level) {
    case 2:
      return `${base} text-2xl mt-14 mb-10`
    case 3:
      return `${base} text-xl mt-10 mb-6`
    case 4:
      return `${base} text-lg mt-8  mb-4`
    case 5:
      return `${base} text-base mt-6 mb-3`
    default:
      return `${base} text-sm mt-4 mb-2`
  }
}

type MDHeadingProps = {
  level: 2 | 3 | 4 | 5 | 6
  children: ReactNode
}

export const MDHeading = ({ level, children }: MDHeadingProps) => {
  const text = String(children)
  const slug = toSlug(text)

  const Tag = `h${level}` as const

  return (
    <Tag id={slug} className={headingClassName(level)}>
      <a
        href={`#${slug}`}
        aria-label={`To heading: ${text}`}
        className="no-underline hover:opacity-80 transition-opacity duration-200"
      >
        {children}
      </a>
    </Tag>
  )
}
