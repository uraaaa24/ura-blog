import { getAllBooks } from '@/lib/books'

import BooksPageContent from './_components/books-page-content'

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
  const books = await getAllBooks()

  return <BooksPageContent books={books} />
}

export default BooksPage
