import Section from '@/components/layouts/section'
import SectionHeader from '@/components/layouts/section-header'
import AboutHero from '@/features/about/components/about-hero'
import { getBooks } from '@/features/books/api/get-books'
import BookItem from '@/features/books/components/book-item'
import { getPosts } from '@/features/posts/api/get-posts'
import LatestPosts from '@/features/posts/components/latest-posts'

const LATEST_ITEMS_COUNT = 3

const HomePage = async () => {
  const latestPosts = await getPosts(LATEST_ITEMS_COUNT)
  const latestBooks = await getBooks(LATEST_ITEMS_COUNT)

  return (
    <>
      <div className="min-h-[90vh] flex items-start justify-center pt-20 md:pt-32">
        <AboutHero />
      </div>

      <Section>
        <SectionHeader title="Posts" />
        <LatestPosts totalPosts={latestPosts} />
      </Section>

      <Section>
        <SectionHeader title="Books" />
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
