import { Heading1 } from '@/components/heading'
import PostItems from '@/components/posts/post-items'
import { getAllPosts } from '@/lib/post'
import { getZennRssFeed } from '@/lib/zenn'

const PostsPage = async () => {
  const posts = await getAllPosts()
  const zennPosts = await getZennRssFeed()

  const totalPosts = Array.from(new Set([...posts, ...zennPosts])).sort(
    (a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime()
  )

  return (
    <>
      <Heading1>Posts</Heading1>
      <PostItems totalPosts={totalPosts} />
    </>
  )
}

export default PostsPage
