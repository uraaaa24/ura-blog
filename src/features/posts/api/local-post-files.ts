import fs from 'node:fs'
import path from 'node:path'

export const postsDirectory = path.join(process.cwd(), 'contents')

export type LocalPostFile = {
  slug: string
  fullPath: string
  sourceDir: string
}

export const getLocalPostFiles = (): LocalPostFile[] => {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .flatMap((entry): LocalPostFile[] => {
      const entryPath = path.join(postsDirectory, entry.name)

      if (!entry.isDirectory()) return []

      const indexPath = path.join(entryPath, 'index.md')
      return fs.existsSync(indexPath)
        ? [{ slug: entry.name, fullPath: indexPath, sourceDir: entryPath }]
        : []
    })
}

export const findLocalPostFile = (slug: string): LocalPostFile | undefined => {
  const postPath = path.join(postsDirectory, slug, 'index.md')
  if (fs.existsSync(postPath)) {
    return {
      slug,
      fullPath: postPath,
      sourceDir: path.dirname(postPath)
    }
  }

  return undefined
}
