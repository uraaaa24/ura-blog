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

/** contents ディレクトリ内の posts フォルダ */
const publicSlugDir = (slug: string) => path.join(process.cwd(), 'public', 'contents', slug)

/**
 * 画像を public ディレクトリにコピーするヘルパー関数
 */
export const copyImageToPublic = (slug: string, imagePath: string): void => {
  try {
    const sourcePath = path.join(postsDirectory, imagePath)
    const imagesDir = publicSlugDir(slug)

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true })
    }

    const fileName = path.basename(imagePath)
    const publicPath = path.join(imagesDir, fileName)

    if (fs.existsSync(sourcePath) && !fs.existsSync(publicPath)) {
      fs.copyFileSync(sourcePath, publicPath)
      console.log(`Copied image: ${imagePath} → contents/${slug}/${fileName}`)
    }
  } catch (error) {
    console.error(`Failed to copy image ${imagePath}:`, error)
  }
}

/**
 * コンテンツ内の画像リンクを処理するヘルパー関数
 * ![alt](path/to/image) → ![](/contents/slug/image)
 */
export const processContentImages = (slug: string, content: string): string => {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  return content.replace(imageRegex, (match, _alt, p1) => {
    if (p1.startsWith('/') || p1.startsWith('http')) return match

    const possiblePaths = p1.includes('/') ? [p1] : [p1, `_images/${p1}`]

    for (const rel of possiblePaths) {
      const abs = path.join(postsDirectory, rel)
      if (fs.existsSync(abs)) {
        copyImageToPublic(slug, rel)
        const fileName = path.basename(rel)
        return `![](/contents/${slug}/${fileName})`
      }
    }
    return match
  })
}

/**
 * タイトルの正規化
 */
export const normalizeTitle = (title: unknown, slug: string): string => {
  const safe = String(title ?? '').trim()
  return safe.length > 0 ? safe : slug
}
