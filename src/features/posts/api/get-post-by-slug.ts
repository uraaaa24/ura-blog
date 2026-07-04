import fs from 'node:fs'
import path from 'node:path'

import { cache } from 'react'

import { formatDate, toValidDate } from '@/lib/date-utils'
import {
  getFrontmatterString,
  getFrontmatterStringArray,
  parseFrontmatter
} from '@/lib/frontmatter'
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
    const { data, content } = parseFrontmatter(fs.readFileSync(fullPath, 'utf8'))

    const processed = processContentImages(slug, content)

    const date = getFrontmatterString(data, 'date')
    const parsedDate = toValidDate(date)
    const dateIso = parsedDate ? parsedDate.toISOString() : date
    const formattedDate = parsedDate
      ? formatDate(parsedDate, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : date

    return {
      slug,
      title: normalizeTitle(getFrontmatterString(data, 'title'), slug),
      thumbnail: extractImageSrc(getFrontmatterString(data, 'thumbnail')),
      date: dateIso,
      formattedDate,
      excerpt: getFrontmatterString(data, 'excerpt'),
      tags: getFrontmatterStringArray(data, 'tags'),
      content: processed,
      toc: generateToc(processed)
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return undefined
  }
})
