'use client'

import PageHeader from '@/components/page-header'
import PostItem from '@/components/posts/post-item'
import SearchInput from '@/components/search-input'
import { useSearch } from '@/hooks/useSearch'
import type { Post } from '@/lib/post'

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

export default PostsPageContent
