/**
 * テキストから読了時間を計算
 * 日本語: 400-600文字/分
 * 英語: 200-250単語/分
 */
export function calculateReadingTime(content: string): number {
  // Markdown記法を削除
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // コードブロックを削除
    .replace(/`[^`]*`/g, '') // インラインコードを削除
    .replace(/!\[.*?\]\(.*?\)/g, '') // 画像を削除
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // リンクからテキストのみ抽出
    .replace(/[#*_~]/g, '') // Markdown記号を削除
    .replace(/\n+/g, ' ') // 改行を空白に置き換え

  // 日本語文字（ひらがな、カタカナ、漢字）をカウント
  const japaneseChars = (plainText.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g) || [])
    .length

  // 英単語をカウント
  const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length

  // 読了時間を計算（分）
  // 日本語: 500文字/分、英語: 225単語/分
  const japaneseMinutes = japaneseChars / 500
  const englishMinutes = englishWords / 225

  const totalMinutes = japaneseMinutes + englishMinutes

  // 最低1分
  return Math.max(1, Math.ceil(totalMinutes))
}

/**
 * 読了時間を人間が読みやすい形式で返す（英語表記）
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 min read'
  }
  return `${minutes} min read`
}
