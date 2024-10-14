import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

type Post = {
  slug: string
  content: string
  title: string
  date: string
}

const postsDirectory = path.join(process.cwd(), 'src', 'contents', 'post')

/**
 * Get all post slugs
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  return { ...data, slug: realSlug, content } as Post
}

/**
 * Get all posts
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug)).sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}
