import fs from 'node:fs'
import path from 'node:path'

import twemoji from '@twemoji/api'

const postsDirectory = path.join(process.cwd(), 'contents')

/**
 * 画像の src 属性を抽出するヘルパー関数
 */
export const extractImageSrc = (htmlString: string) => {
  const _twemoji = twemoji.parse(htmlString, {
    folder: 'svg',
    ext: '.svg'
  })
  const match = _twemoji.match(/src="([^"]+)"/)
  return match ? match[1] : null
}

type ProcessContentImagesOptions = {
  sourceDir?: string
}

const isExternalOrPublicPath = (src: string) =>
  src.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(src)

const splitImagePath = (src: string) => {
  const match = src.match(/^([^?#]*)([?#].*)?$/)
  return {
    pathname: match?.[1] ?? src,
    suffix: match?.[2] ?? ''
  }
}

const toPublicContentPath = (slug: string, relativePath: string) =>
  `/contents/${slug}/${relativePath.split(path.sep).join('/')}`

const resolveLocalImage = (src: string, sourceDir: string) => {
  const { pathname, suffix } = splitImagePath(src)
  const absolutePath = path.resolve(sourceDir, pathname)
  const relativePath = path.relative(sourceDir, absolutePath)

  if (
    !relativePath.startsWith('..') &&
    !path.isAbsolute(relativePath) &&
    fs.existsSync(absolutePath)
  ) {
    return {
      relativePath,
      suffix
    }
  }

  return undefined
}

/**
 * コンテンツ内の画像リンクを処理するヘルパー関数
 * ![alt](./image.png) → ![alt](/contents/slug/image.png)
 */
export const processContentImages = (
  slug: string,
  content: string,
  options: ProcessContentImagesOptions = {}
): string => {
  const sourceDir = options.sourceDir ?? postsDirectory
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  return content.replace(imageRegex, (match, alt, src) => {
    if (isExternalOrPublicPath(src)) return match

    const image = resolveLocalImage(src, sourceDir)
    if (!image) return match

    const publicPath = toPublicContentPath(slug, image.relativePath)
    return `![${alt}](${publicPath}${image.suffix})`
  })
}

/**
 * タイトルの正規化
 */
export const normalizeTitle = (title: unknown, slug: string): string => {
  const safe = String(title ?? '').trim()
  return safe.length > 0 ? safe : slug
}
