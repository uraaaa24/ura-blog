const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'])

export const getYouTubeVideoId = (href?: string) => {
  if (!href) return undefined

  try {
    const url = new URL(href)
    if (!YOUTUBE_HOSTS.has(url.hostname)) return undefined

    if (url.hostname === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0]
    }

    if (url.pathname === '/watch') {
      return url.searchParams.get('v') ?? undefined
    }

    const [, videoId] = url.pathname.match(/^\/(?:embed|shorts)\/([^/?#]+)/) ?? []
    return videoId
  } catch {
    return undefined
  }
}

export const isPlainUrlText = (children: unknown, href?: string) => {
  if (!href) return false
  return Array.isArray(children)
    ? children.join('').trim() === href
    : String(children ?? '').trim() === href
}
