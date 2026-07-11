import fs from 'node:fs'

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
import { findLocalPostFile } from './local-post-files'

/**
 * 指定されたスラッグのポストを取得する関数
 */
export const getPostBySlug = cache(async (slug: string): Promise<Post | undefined> => {
  try {
    const postFile = findLocalPostFile(slug)
    if (!postFile) return undefined

    const { data, content } = parseFrontmatter(fs.readFileSync(postFile.fullPath, 'utf8'))

    if (data.published !== true) return undefined

    const processed = processContentImages(slug, content, { sourceDir: postFile.sourceDir })

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
