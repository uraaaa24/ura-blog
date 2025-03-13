import fs from 'node:fs'
import path from 'node:path'

import twemoji from '@twemoji/api'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export type Post = {
  slug: string
  title: string
  thumbnail: string | null
  date: string
  formattedDate: string
  content: string
  excerpt?: string
  tags?: string[]
}

const extractImageSrc = (htmlString: string) => {
  const _twemoji = twemoji.parse(htmlString)
  const match = _twemoji.match(/src="([^"]+)"/)
  return match ? match[1] : null
}

export async function getAllPosts(): Promise<Post[]> {
  // フォルダが存在しない場合に作成
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => {
      return path.extname(fileName).toLowerCase() === '.md'
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // 日付のフォーマット
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
        content
      }
    })

  // 日付順にソート（新しい記事が先頭に）
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 日付のフォーマット
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
      content
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return undefined
  }
}
