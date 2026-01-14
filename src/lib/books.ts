import fs from 'node:fs'
import path from 'node:path'

const booksDataPath = path.join(process.cwd(), 'data', 'books.json')

export type Book = {
  id: string
  title: string
  completedDate: string
  formattedDate: string
  url: string
}

const toValidDate = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const date = new Date(
    typeof value === 'string' || typeof value === 'number' ? value : String(value)
  )
  return Number.isNaN(date.getTime()) ? null : date
}

const formatDate = (date: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts }).format(date)

export async function getAllBooks(): Promise<Book[]> {
  try {
    if (!fs.existsSync(booksDataPath)) {
      const dataDir = path.dirname(booksDataPath)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      fs.writeFileSync(booksDataPath, JSON.stringify([]))
      return []
    }

    const fileContent = fs.readFileSync(booksDataPath, 'utf8')
    const books = JSON.parse(fileContent) as Array<{
      id: string
      title: string
      completedDate: string
      url: string
    }>

    return books
      .map((book) => {
        const parsedDate = toValidDate(book.completedDate)
        const dateIso = parsedDate ? parsedDate.toISOString() : String(book.completedDate)
        const formattedDate = parsedDate
          ? formatDate(parsedDate, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : String(book.completedDate)

        return {
          ...book,
          completedDate: dateIso,
          formattedDate
        }
      })
      .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
  } catch (error) {
    console.error('Error reading books data:', error)
    return []
  }
}
