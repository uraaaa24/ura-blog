import { getAllPosts } from '@/lib/post'

import PostCard from './_components/postCard'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">最新の記事</h2>
      <div className="flex flex-wrap w-full mx-auto justify-center">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
