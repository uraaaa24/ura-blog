import fs from 'node:fs'
import path from 'node:path'

import twemoji from '@twemoji/api'
import matter from 'gray-matter'

import { formatDate, toValidDate } from './date-utils'
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
  toc?: TocItem[]
}

const normalizeTitle = (title: unknown, slug: string): string => {
  const safe = String(title ?? '').trim()
  return safe.length > 0 ? safe : slug
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

      const processed = processContentImages(slug, content)

      const parsedDate = toValidDate(data.date)
      const dateIso = parsedDate ? parsedDate.toISOString() : String(data.date)
      const formattedDate = parsedDate
        ? formatDate(parsedDate, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : String(data.date)

      return {
        slug,
        title: normalizeTitle(data.title, slug),
        thumbnail: extractImageSrc(data.thumbnail || ''),
        date: dateIso,
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

    const processed = processContentImages(slug, content)

    const parsedDate = toValidDate(data.date)
    const dateIso = parsedDate ? parsedDate.toISOString() : String(data.date)
    const formattedDate = parsedDate
      ? formatDate(parsedDate, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : String(data.date)

    return {
      slug,
      title: normalizeTitle(data.title, slug),
      thumbnail: extractImageSrc(data.thumbnail || ''),
      date: dateIso,
      formattedDate,
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content: processed,
      toc: generateToc(processed)
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return undefined
  }
}

/**
 * 関連記事を取得する関数（タグベースでの類似度計算）
 */
export async function getRelatedPosts(currentPost: Post, limit: number = 3): Promise<Post[]> {
  const allPosts = await getAllPosts()
  const currentTags = currentPost.tags || []

  // 現在の記事を除外
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug)

  // タグの一致数でスコアリング
  const postsWithScores = otherPosts.map((post) => {
    const postTags = post.tags || []
    const matchingTags = postTags.filter((tag) => currentTags.includes(tag))
    return {
      post,
      score: matchingTags.length
    }
  })

  // スコアの高い順にソートして、上位limit件を返す
  return postsWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}
