'use client'

import { useMemo, useState } from 'react'

import Input from '@/components/input'
import type { Book } from '@/lib/books'

import BookItem from '../book-item'

type BookItemsProps = {
  books: Book[]
  showSearch?: boolean
}

const BookItems = ({ books, showSearch = false }: BookItemsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredBooks = useMemo(
    () =>
      books.filter((book) => {
        if (!searchQuery) return true

        return book.title.toLowerCase().includes(searchQuery.toLowerCase())
      }),
    [books, searchQuery]
  )

  // 年・月ごとにグループ化
  const groupedByYearMonth = useMemo(() => {
    const yearGroups = new Map<number, Map<number, Book[]>>()

    for (const book of filteredBooks) {
      const date = new Date(book.completedDate)
      const year = date.getFullYear()
      const month = date.getMonth()

      if (!yearGroups.has(year)) {
        yearGroups.set(year, new Map())
      }

      const monthGroups = yearGroups.get(year)!
      const existing = monthGroups.get(month) || []
      monthGroups.set(month, [...existing, book])
    }

    // 年の降順、月の降順でソート
    return Array.from(yearGroups.entries())
      .sort(([yearA], [yearB]) => yearB - yearA)
      .map(([year, monthGroups]) => ({
        year,
        months: Array.from(monthGroups.entries()).sort(([monthA], [monthB]) => monthB - monthA)
      }))
  }, [filteredBooks])

  const getMonthName = (monthIndex: number) => {
    return new Date(2000, monthIndex).toLocaleString('en-US', { month: 'long' })
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>まだ本が登録されていません</p>
      </div>
    )
  }

  return (
    <>
      {showSearch && (
        <div className="mb-8">
          <Input
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            placeholder="Search books"
          />
        </div>
      )}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No books found</p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedByYearMonth.map(({ year, months }) => (
            <div key={year}>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{year}</h2>
              <div className="space-y-10">
                {months.map(([month, monthBooks]) => (
                  <div key={month}>
                    <h3 className="text-base font-semibold mb-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {getMonthName(month)}
                    </h3>
                    <div className="space-y-0">
                      {monthBooks.map((book) => (
                        <BookItem key={book.id} book={book} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default BookItems
