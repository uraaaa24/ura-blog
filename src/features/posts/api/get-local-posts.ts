import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'

import { formatDate, toValidDate } from '@/lib/date-utils'

import type { Post } from '../types'
import { extractImageSrc, normalizeTitle, processContentImages } from '../utils/process-markdown'

const postsDirectory = path.join(process.cwd(), 'contents')

/**
 * posts ディレクトリ内の全ての Markdown ファイルを取得し、Post オブジェクトの配列を返す
 */
export async function getLocalPosts(): Promise<Post[]> {
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
