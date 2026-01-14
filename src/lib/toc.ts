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
  // コードブロックを除外
  const codeBlockRegex = /```[\s\S]*?```/g
  const contentWithoutCodeBlocks = content.replace(codeBlockRegex, '')

  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TocItem[] = []
  const idCounts = new Map<string, number>()

  let match: RegExpExecArray | null = null

  match = headingRegex.exec(contentWithoutCodeBlocks)
  while (match !== null) {
    const level = match[1].length // ## = 2, ### = 3
    const text = match[2].trim()
    let id = toSlug(text)

    // IDが重複する場合は連番を付ける
    if (idCounts.has(id)) {
      const count = idCounts.get(id)! + 1
      idCounts.set(id, count)
      id = `${id}-${count}`
    } else {
      idCounts.set(id, 1)
    }

    toc.push({
      id,
      text,
      level
    })

    match = headingRegex.exec(contentWithoutCodeBlocks)
  }

  return toc
}
