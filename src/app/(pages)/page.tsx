import Section from '@/components/layouts/section'
import SectionHeader from '@/components/layouts/section-header'
import AboutHero from '@/features/about/components/about-hero'
import { getPosts } from '@/features/posts/server/posts'
import LatestPosts from '@/features/posts/components/latest-posts'

const LATEST_ITEMS_COUNT = 5

const HomePage = async () => {
  const latestPosts = await getPosts(LATEST_ITEMS_COUNT)

  return (
    <>
      <div className="min-h-[90vh] flex items-start justify-center pt-20 md:pt-32">
        <AboutHero />
      </div>

      <Section>
        <SectionHeader title="Posts" />
        <LatestPosts totalPosts={latestPosts} />
      </Section>
    </>
  )
}

export default HomePage
