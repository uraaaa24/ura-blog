'use client'

import { useMemo, useState } from 'react'

import PostItem from '../post-item'

import type { Post } from '@/lib/post'

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
          <input
            type="text"
            placeholder="Search posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
          />
        </div>
      )}
      {filteredPosts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </>
  )
}

export default PostItems
