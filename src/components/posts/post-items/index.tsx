import PostItem from '../post-item'

import type { Post } from '@/lib/post'

type PostItemsProps = {
  totalPosts: Post[]
}

const PostItems = ({ totalPosts }: PostItemsProps) => {
  return (
    <>
      {totalPosts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </>
  )
}

export default PostItems
