'use client'

import PageHeader from '@/components/layouts/page-header'
import SearchInput from '@/components/ui/search-input'
import { useSearch } from '@/hooks/useSearch'

import type { Post } from '../types'
import PostList from './post-list'

type PostsPageContentProps = {
  posts: Post[]
}

const PostsPageContent = ({ posts }: PostsPageContentProps) => {
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
      <PageHeader
        title="Posts"
        action={
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search posts" />
        }
      />
      <PostList posts={filteredPosts} />
      {filteredPosts.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          No posts found.
        </p>
      )}
    </>
  )
}

export default PostsPageContent
