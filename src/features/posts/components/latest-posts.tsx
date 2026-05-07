import type { Post } from '../types'
import PostItems from './post-items'

type LatestPostsProps = {
  totalPosts: Post[]
}

const LatestPosts = ({ totalPosts }: LatestPostsProps) => {
  return <PostItems posts={totalPosts} />
}

export default LatestPosts
