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
      <h1 className="text-3xl font-bold mb-4">Hey there, I&apos;m Ura! 👋</h1>
      <p className="leading-8">
        I&apos;m an engineer focusing on front-end development.
        <br />
        I also have experience in back-end and infrastructure.
        <br />
        A devoted Arsenal fan who loves playing soccer.
        <br />
        Fueled by a good cup of coffee ☕️
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <div>
          {totalPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
