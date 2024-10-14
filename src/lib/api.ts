import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import { Post } from '@/types/post'

const contentsDirectory = path.join(process.cwd(), 'src', 'contents')

/** Get directory by type */
function getDirectory(type: Post['type']): string {
  return path.join(contentsDirectory, `${type}s`)
}

/** Get all post slugs */
export function getPostSlugs(type: Post['type']): string[] {
  const directory = getDirectory(type)
  return fs.readdirSync(directory)
}

/** Get post by slug */
export function getPostBySlug<T extends Post>(type: T['type'], slug: string): T {
  const realSlug = slug.replace(/\.md$/, '')
  const directory = getDirectory(type)
  const fullPath = path.join(directory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  return { ...data, slug: realSlug, content, type } as T
}

/** Get all posts */
export function getAllPosts<T extends Post>(type: T['type']): T[] {
  const slugs = getPostSlugs(type)
  const posts = slugs
    .map((slug) => getPostBySlug(type, slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

/** Get all articles */
export function getAllArticles() {
  return getAllPosts('article')
}

/** Get all scraps */
export function getAllScraps() {
  return getAllPosts('scrap')
}
