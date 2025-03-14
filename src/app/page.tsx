import Image from 'next/image'
import Link from 'next/link'

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
    <div className="mx-auto max-w-2xl">
      <section className="pb-4 mb-4">
        <h1 className="text-3xl font-bold mb-4">Hey there, I&apos;m Ura! ⚽️</h1>
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
            <a href="https://github.com/uraaaa24" target="_blank" rel="noopener noreferrer">
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            </a>
            <a href="https://zenn.dev/uraaaa24" target="_blank" rel="noopener noreferrer">
              <Image src="/zenn.svg" alt="Zenn" width={24} height={24} />
            </a>
            <a href="https://twitter.com/__ars____24" target="_blank" rel="noopener noreferrer">
              <Image src="/x.svg" alt="X(Twitter)" width={24} height={24} />
            </a>
          </div>
          <Link href="/about" className="text-gray-400 transition-colors hover:text-gray-700">
            Read more about me →
          </Link>
        </div>
      </section>

      <section className="pb-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <div>
          {totalPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
