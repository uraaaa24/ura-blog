import fs from 'node:fs'
import path from 'node:path'

import { cache } from 'react'

const booksDataPath = path.join(process.cwd(), 'data', 'books.json')

export type Book = {
  id: string
  title: string
  completedDate: string
  formattedDate: string
  url: string
}

/**
 * Convert value to valid Date or null if invalid
 */
const toValidDate = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const date = new Date(
    typeof value === 'string' || typeof value === 'number' ? value : String(value)
  )
  return Number.isNaN(date.getTime()) ? null : date
}

/**
 * Format date to string with given options
 */
const formatDate = (date: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts }).format(date)

export const getAllBooks = cache(async (limit?: number): Promise<Book[]> => {
  try {
    if (!fs.existsSync(booksDataPath)) {
      const dataDir = path.dirname(booksDataPath)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      fs.writeFileSync(booksDataPath, JSON.stringify([]))
      return []
    }

    // Read the JSON file
    const fileContent = fs.readFileSync(booksDataPath, 'utf8')
    const books = JSON.parse(fileContent)
    if (!Array.isArray(books)) {
      console.error('Books data is not an array.')
      return []
    }

    /**
     * Sort books by completedDate or formattedDate in descending order
     */
    const toSortTime = (value: { completedDate: string; formattedDate: string }) => {
      const dateTime = new Date(value.completedDate).getTime()
      if (!Number.isNaN(dateTime)) return dateTime

      const formattedTime = new Date(value.formattedDate).getTime()
      return Number.isNaN(formattedTime) ? 0 : formattedTime
    }

    const normalized = books.map((book) => {
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
    }) as Book[]

    const sorted = normalized.sort((a, b) => toSortTime(b) - toSortTime(a))
    return limit ? sorted.slice(0, limit) : sorted
  } catch (error) {
    console.error('Error reading books data:', error)
    return []
  }
})
