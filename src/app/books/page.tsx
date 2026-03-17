import BookItems from '@/components/books/book-items'
import Section from '@/components/section'
import { getAllBooks } from '@/lib/books'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Books',
  description: 'Uraが読んだ本の記録。プログラミング、技術書、ビジネス書など様々なジャンルの読書記録を公開しています。',
  openGraph: {
    title: 'Books | Uralog',
    description: 'Uraが読んだ本の記録。プログラミング、技術書、ビジネス書など様々なジャンルの読書記録を公開しています。',
    url: '/books',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Books | Uralog',
    description: 'Uraが読んだ本の記録。プログラミング、技術書、ビジネス書など様々なジャンルの読書記録を公開しています。'
  }
}

const BooksPage = async () => {
  const books = await getAllBooks()

  return (
    <>
      <div className="flex items-baseline gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Books
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Books I have read</p>
      </div>
      <Section>
        <BookItems books={books} showSearch={true} />
      </Section>
    </>
  )
}

export default BooksPage
