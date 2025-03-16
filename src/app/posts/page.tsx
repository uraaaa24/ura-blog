import { Heading1 } from '@/components/heading'
import PostItems from '@/components/posts/post-items'
import { fetchPosts } from '@/lib/data'

const PostsPage = async () => {
  const totalPosts = await fetchPosts()

  return (
    <>
      <Heading1>Posts</Heading1>
      <PostItems totalPosts={totalPosts} />
    </>
  )
}

export default PostsPage
