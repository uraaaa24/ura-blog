'use client'

import { useMemo, useState } from 'react'

import Input from '@/components/input'
import type { Post } from '@/lib/post'

import PostItem from '../post-item'

type PostItemsProps = {
  posts: Post[]
  showSearch?: boolean
}

const PostItems = ({ posts, showSearch = false }: PostItemsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        if (!searchQuery) return true

        return post.title.toLowerCase().includes(searchQuery.toLowerCase())
      }),
    [posts, searchQuery]
  )

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
