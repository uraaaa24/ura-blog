import Link from 'next/link'

import { Heading1, Heading2 } from '@/components/heading'
import Section from '@/components/section'
import SocialLinks from '@/components/socialLinks'
import { getAllPosts } from '@/lib/post'
import { getZennRssFeed } from '@/lib/zenn'

import PostItem from '../components/postItem'

const HomePage = async () => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  const totalPosts = Array.from(new Set([...posts, ...zennPosts]))
    .slice(0, 5)
    .sort((a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime())

  return (
    <>
      <Section>
        <Heading1>Hi there, I&apos;m Ura! ⚽️</Heading1>
        <div className="flex flex-col space-y-6">
          <p>
            I&apos;m an engineer focusing on front-end development.
            <br />
            I also have experience in back-end and infrastructure.
            <br />
            A devoted Arsenal fan who loves playing soccer.
            <br />
            Fueled by a good cup of coffee ☕️
            <br />
          </p>
          <SocialLinks />
          <Link href="/about" className="text-gray-400 transition-colors hover:text-gray-700">
            Read more about me →
          </Link>
        </div>
      </Section>

      <Section>
        <Heading2>Latest Posts</Heading2>
        <div>
          {totalPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  )
}

export default HomePage
