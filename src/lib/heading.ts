/**
 * rehype-slug が内部で使う github-slugger の挙動に寄せた見出しID生成。
 * 空白をまとめて潰さず、記号を除去した結果の連続スペースは連続ハイフンとして残す。
 */
export const toHeadingId = (text: string): string => {
  return text
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N} _-]+/gu, '')
    .replace(/ /g, '-')
}

/**
 * DOMのidはそのまま保持し、URL fragment に入れる時だけエンコードする。
 * 日本語や記号を含む見出しIDでも、本文見出しリンクと目次リンクで同じhrefを生成する。
 */
export const toHashHref = (id: string) => `#${encodeURIComponent(id)}`
