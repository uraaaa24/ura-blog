import fs from 'node:fs/promises'
import path from 'node:path'

const contentsDirectory = path.join(process.cwd(), 'contents')

const contentTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
}

const resolveContentPath = (segments: string[]) => {
  const filePath = path.resolve(contentsDirectory, ...segments)
  const relativePath = path.relative(contentsDirectory, filePath)

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return undefined
  }

  if (path.basename(filePath) === 'index.md' || path.extname(filePath).toLowerCase() === '.md') {
    return undefined
  }

  return filePath
}

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params
  const filePath = resolveContentPath(segments)

  if (!filePath) {
    return new Response('Not Found', { status: 404 })
  }

  try {
    const file = await fs.readFile(filePath)
    const contentType =
      contentTypes[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream'

    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}
