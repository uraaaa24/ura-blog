import { getAllPosts } from '@/lib/post'
import { getZennRssFeed } from '@/lib/zenn'

import PostItem from '../../components/postItem'

const PostsPage = async () => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  const totalPosts = Array.from(new Set([...posts, ...zennPosts])).sort(
    (a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime()
  )

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Posts</h2>

      <div className="flex flex-col w-full mx-auto justify-center">
        {totalPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}

export default PostsPage
