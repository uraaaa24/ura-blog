import type { Post } from '@/lib/post'

import { Heading2 } from '@/components/heading'
import PostItems from '@/components/posts/post-items'

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
