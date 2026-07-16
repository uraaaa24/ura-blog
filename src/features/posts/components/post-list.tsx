import type { PostSummary } from '../types'
import PostItem from './post-item'

type PostListProps = {
  posts: PostSummary[]
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul>
      {posts.map((post, index) => {
        const showDivider = index < posts.length - 1

        return (
          <li
            key={`${post.source}:${post.href}`}
            className={showDivider ? 'border-b border-gray-300 dark:border-gray-600' : ''}
          >
            <PostItem post={post} />
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
