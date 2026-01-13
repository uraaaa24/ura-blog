import fs from 'node:fs'
import path from 'node:path'

import twemoji from '@twemoji/api'
import matter from 'gray-matter'

import { calculateReadingTime } from './reading-time'
import { generateToc, type TocItem } from './toc'

const postsDirectory = path.join(process.cwd(), 'contents')

export type Post = {
  slug: string
  title: string
  thumbnail: string | null
  date: string
  formattedDate: string
  content: string
  excerpt?: string
  tags?: string[]
  readingTime?: number
  toc?: TocItem[]
}

/**
 * 画像の src 属性を抽出するヘルパー関数
 */
const extractImageSrc = (htmlString: string) => {
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
const copyImageToPublic = (slug: string, imagePath: string): void => {
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
 * Obsidian の画像リンクを Markdown 形式に変換するヘルパー関数
 * ![[filename]] → ![](/contents/slug/filename)
 */
const convertObsidianImages = (slug: string, content: string): string => {
  return content.replace(/!\[\[([^\]]+)\]\]/g, (_match, filename) => {
    const possiblePaths = [filename, `_images/${filename}`]

    const found = possiblePaths
      .map((rel) => ({ rel, abs: path.join(postsDirectory, rel) }))
      .find(({ abs }) => fs.existsSync(abs))

    const relPath = found?.rel ?? filename
    const imageName = path.basename(relPath)

    copyImageToPublic(slug, relPath)

    // Markdown には slug フォルダ付きで書き込む
    return `![](/contents/${slug}/${imageName})`
  })
}

/**
 * コンテンツ内の画像リンクを処理するヘルパー関数
 * ![alt](path/to/image) → ![](/contents/slug/image)
 */
const processContentImages = (slug: string, content: string): string => {
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
 * posts ディレクトリ内の全ての Markdown ファイルを取得し、Post オブジェクトの配列を返す
 */
export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((f) => path.extname(f).toLowerCase() === '.md')
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))

      let processed = convertObsidianImages(slug, content)
      processed = processContentImages(slug, processed)

      const date = new Date(data.date)
      const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })

      return {
        slug,
        title: data.title,
        thumbnail: extractImageSrc(data.thumbnail || ''),
        date: data.date,
        formattedDate,
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        content: processed
      }
    })

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * 指定されたスラッグのポストを取得する関数
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))

    let processed = convertObsidianImages(slug, content)
    processed = processContentImages(slug, processed)

    const date = new Date(data.date)
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return {
      slug,
      title: data.title,
      thumbnail: extractImageSrc(data.thumbnail || ''),
      date: data.date,
      formattedDate,
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content: processed,
      readingTime: calculateReadingTime(processed),
      toc: generateToc(processed)
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return undefined
  }
}
