import PostItems from '@/components/posts/post-items'
import type { Post } from '@/lib/post'

type LatestPostsProps = {
  totalPosts: Post[]
}

const LatestPosts = ({ totalPosts }: LatestPostsProps) => {
  return <PostItems posts={totalPosts} />
}

export default LatestPosts
