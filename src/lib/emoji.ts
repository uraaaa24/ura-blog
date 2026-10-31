import twemoji from '@twemoji/api'

export const extractImageSrc = (emoji: string): string | null => {
  const parsed = twemoji.parse(emoji, {
    folder: 'svg',
    ext: '.svg'
  })
  const match = parsed.match(/src="([^"]+)"/)
  return match ? match[1] : null
}
