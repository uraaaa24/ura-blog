import { Heading2 } from '@/components/heading'
import PostItems from '@/components/posts/post-items'
import type { Post } from '@/lib/post'

type LatestPostsProps = {
  totalPosts: Post[]
}

const LatestPosts = ({ totalPosts }: LatestPostsProps) => {
  return (
    <>
      <Heading2>Latest Posts</Heading2>
      <PostItems posts={totalPosts} />
    </>
  )
}

export default LatestPosts
