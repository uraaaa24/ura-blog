import Section from '@/components/section'
import { fetchPosts } from '@/lib/data'

import HeroContent from './_components/hero-content'
import LatestPosts from './_components/latest-posts'

const HomePage = async () => {
  const totalPosts = await fetchPosts(5)

  return (
    <>
      <Section>
        <HeroContent />
      </Section>

      <Section>
        <LatestPosts totalPosts={totalPosts} />
      </Section>
    </>
  )
}

export default HomePage
