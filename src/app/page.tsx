import Image from 'next/image'
import Link from 'next/link'

import { SOCIAL_LINKS } from '@/constants/sns'
import { getAllPosts } from '@/lib/post'
import { getZennRssFeed } from '@/lib/zenn'

import PostCard from './_components/postCard'

const HomePage = async () => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  const totalPosts = Array.from(new Set([...posts, ...zennPosts]))
    .slice(0, 5)
    .sort((a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime())

  return (
    <>
      <section className="pb-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">Hi there, I&apos;m Ura! ⚽️</h1>
        <div className="flex flex-col space-y-6">
          <p className="leading-8">
            I&apos;m an engineer focusing on front-end development.
            <br />
            I also have experience in back-end and infrastructure.
            <br />
            A devoted Arsenal fan who loves playing soccer.
            <br />
            Fueled by a good cup of coffee ☕️
            <br />
          </p>
          <div className="flex space-x-6">
            {SOCIAL_LINKS.map(({ href, src, alt }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={src}
                  alt={alt}
                  width={24}
                  height={24}
                  className="hover:opacity-75 transition-opacity duration-200"
                />
              </a>
            ))}
          </div>
          <Link href="/about" className="text-gray-400 transition-colors hover:text-gray-700">
            Read more about me →
          </Link>
        </div>
      </section>

      <section className="pb-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <div>
          {totalPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
