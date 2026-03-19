'use client'

import Input from '@/components/input'
import { useSearch } from '@/hooks/useSearch'
import type { Post } from '@/lib/post'

import PostItem from '../post-item'

type PostItemsProps = {
  posts: Post[]
  showSearch?: boolean
}

const PostItems = ({ posts, showSearch = false }: PostItemsProps) => {
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredPosts
  } = useSearch({
    items: posts,
    searchKey: 'title'
  })

  return (
    <>
      {showSearch && (
        <div className="mb-8">
          <Input
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            placeholder="Search posts"
            ariaLabel="Search posts"
          />
        </div>
      )}
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.slug}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostItems
