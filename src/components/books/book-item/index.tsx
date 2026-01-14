import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

import type { Book } from '@/lib/books'

type BookItemProps = {
  book: Book
}

const BookItem = ({ book }: BookItemProps) => {
  const parsedDate = new Date(book.completedDate)
  const dateTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()

  return (
    <Link
      href={book.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-b border-gray-300 dark:border-gray-600 py-4 block hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors duration-200"
    >
      <article className="h-full">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {book.title}{' '}
              <ExternalLink
                size={16}
                className="text-gray-400 dark:text-gray-500 inline-block align-middle"
              />
            </h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-1">Completed:</span>
              <time dateTime={dateTime}>{book.formattedDate}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BookItem
