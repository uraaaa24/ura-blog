export type TocItem = {
  id: string
  text: string
  level: number
}

/**
 * 見出しテキストからスラッグ（ID）を生成
 * MDHeadingコンポーネントと同じロジック
 */
function toSlug(text: string): string {
  return text
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s-]+/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

/**
 * Markdownコンテンツから目次を生成
 */
export function generateToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TocItem[] = []

  let match: RegExpExecArray | null = null

  match = headingRegex.exec(content)
  while (match !== null) {
    const level = match[1].length // ## = 2, ### = 3
    const text = match[2].trim()
    const id = toSlug(text)

    toc.push({
      id,
      text,
      level
    })

    match = headingRegex.exec(content)
  }

  return toc
}
