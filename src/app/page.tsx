import Section from '@/components/section'
import { getAllPosts } from '@/lib/post'
import { getZennRssFeed } from '@/lib/zenn'

import HeroContent from './_components/heroContent'
import LatestPosts from './_components/latestPosts'

const HomePage = async () => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  const totalPosts = Array.from(new Set([...posts, ...zennPosts]))
    .slice(0, 5)
    .sort((a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime())

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
