import BookItem from '@/components/books/book-item'
import Section from '@/components/section'
import SectionHeader from '@/components/section-header'
import { getAllBooks } from '@/lib/books'
import { fetchPosts } from '@/lib/data'

import HeroContent from './_components/hero-content'
import LatestPosts from './_components/latest-posts'

const LATEST_ITEMS_COUNT = 3

const HomePage = async () => {
  const latestPosts = await fetchPosts(LATEST_ITEMS_COUNT)
  const latestBooks = await getAllBooks(LATEST_ITEMS_COUNT)

  return (
    <>
      <Section>
        <HeroContent />
      </Section>

      <Section>
        <SectionHeader title="Posts" href="/posts" />
        <LatestPosts totalPosts={latestPosts} />
      </Section>

      <Section>
        <SectionHeader title="Books" href="/books" />
        {latestBooks.length ? (
          <div>
            {latestBooks.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Book notes will show up here soon.
          </p>
        )}
      </Section>
    </>
  )
}

export default HomePage
