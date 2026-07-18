'use client'

import { useReadPostKeys } from '../stores/read-posts'
import type { PostSummary } from '../types'
import { createPostReadKey } from '../utils/post-read-key'
import PostItem from './post-item'

type PostListProps = {
  posts: PostSummary[]
}

const PostList = ({ posts }: PostListProps) => {
  const readPostKeys = useReadPostKeys()

  return (
    <ul className="isolate border-b border-gray-300 dark:border-gray-600">
      {posts.map((post) => {
        const postKey = createPostReadKey(post)

        return (
          <li key={postKey}>
            <PostItem post={post} postKey={postKey} isRead={readPostKeys.has(postKey)} />
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
