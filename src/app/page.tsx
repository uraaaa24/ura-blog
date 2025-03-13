import { getAllPosts } from '@/lib/post'
import { getZennRssFeed } from '@/lib/zenn'

import PostCard from './_components/postCard'

const Home = async () => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  const totalPosts = Array.from(new Set([...posts, ...zennPosts])).sort(
    (a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime()
  )

  return (
    <>
      <h2 className="text-3xl mb-4">Posts</h2>

      <div className="flex flex-wrap w-full mx-auto justify-center">
        {totalPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}

export default Home
