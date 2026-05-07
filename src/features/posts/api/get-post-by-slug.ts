import fs from 'node:fs'
import path from 'node:path'

import { cache } from 'react'
import matter from 'gray-matter'

import { formatDate, toValidDate } from '@/lib/date-utils'
import { generateToc } from '@/lib/toc'

import type { Post } from '../types'
import { extractImageSrc, normalizeTitle, processContentImages } from '../utils/process-markdown'

const postsDirectory = path.join(process.cwd(), 'contents')

/**
 * 指定されたスラッグのポストを取得する関数
 */
export const getPostBySlug = cache(async (slug: string): Promise<Post | undefined> => {
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
})
