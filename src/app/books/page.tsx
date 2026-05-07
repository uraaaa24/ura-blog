import { getBooks } from '@/features/books/api/get-books'
import BooksPageContent from '@/features/books/components/books-page-content'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Uraが読んだ本の記録。プログラミング、技術書、ビジネス書など様々なジャンルの読書記録を公開しています。',
  openGraph: {
    title: 'Books | Uralog',
    description:
      'Uraが読んだ本の記録。プログラミング、技術書、ビジネス書など様々なジャンルの読書記録を公開しています。',
    url: '/books',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Books | Uralog',
    description:
      'Uraが読んだ本の記録。プログラミング、技術書、ビジネス書など様々なジャンルの読書記録を公開しています。'
  }
}

const BooksPage = async () => {
  const books = await getBooks()

  return <BooksPageContent books={books} />
}

export default BooksPage
