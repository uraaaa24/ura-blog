import fs from 'node:fs'

import { cache } from 'react'

import { formatDate, toValidDate } from '@/lib/date-utils'
import {
  getFrontmatterString,
  getFrontmatterStringArray,
  parseFrontmatter
} from '@/lib/frontmatter'
import { generateToc } from '@/lib/toc'

import type { LocalPost, LocalPostSummary } from '../types'
import { extractImageSrc, normalizeTitle, processContentImages } from '../utils/process-markdown'
import { findLocalPostFile, getLocalPostFiles } from './local-post-files'

const createLocalPostHref = (slug: string): `/posts/${string}` => `/posts/${slug}`

/** 公開済みのローカル記事を一覧表示用データとして返す。 */
export async function getLocalPosts(): Promise<LocalPostSummary[]> {
  const posts = getLocalPostFiles().flatMap(({ slug, fullPath }) => {
    const { data } = parseFrontmatter(fs.readFileSync(fullPath, 'utf8'))

    if (data.published !== true) return []

    const date = getFrontmatterString(data, 'date')
    const parsedDate = toValidDate(date)

    return [
      {
        source: 'local' as const,
        slug,
        href: createLocalPostHref(slug),
        title: normalizeTitle(getFrontmatterString(data, 'title'), slug),
        thumbnail: extractImageSrc(getFrontmatterString(data, 'thumbnail')),
        publishedAt: parsedDate ? parsedDate.toISOString() : date,
        formattedDate: parsedDate
          ? formatDate(parsedDate, { year: 'numeric', month: 'short', day: 'numeric' })
          : date,
        excerpt: getFrontmatterString(data, 'excerpt'),
        tags: getFrontmatterStringArray(data, 'tags')
      }
    ]
  })

  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

/** 指定したslugのローカル記事を本文と目次を含めて返す。 */
export const getPostBySlug = cache(async (slug: string): Promise<LocalPost | undefined> => {
  try {
    const postFile = findLocalPostFile(slug)
    if (!postFile) return undefined

    const { data, content } = parseFrontmatter(fs.readFileSync(postFile.fullPath, 'utf8'))
    if (data.published !== true) return undefined

    const processedContent = processContentImages(slug, content, {
      sourceDir: postFile.sourceDir
    })
    const date = getFrontmatterString(data, 'date')
    const parsedDate = toValidDate(date)

    return {
      source: 'local',
      slug,
      href: createLocalPostHref(slug),
      title: normalizeTitle(getFrontmatterString(data, 'title'), slug),
      thumbnail: extractImageSrc(getFrontmatterString(data, 'thumbnail')),
      publishedAt: parsedDate ? parsedDate.toISOString() : date,
      formattedDate: parsedDate
        ? formatDate(parsedDate, { year: 'numeric', month: 'long', day: 'numeric' })
        : date,
      excerpt: getFrontmatterString(data, 'excerpt'),
      tags: getFrontmatterStringArray(data, 'tags'),
      content: processedContent,
      toc: generateToc(processedContent)
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return undefined
  }
})
