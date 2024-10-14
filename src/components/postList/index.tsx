import React from 'react'

import PostCard from '@/components/postCard'

import { Post } from '@/types/post'

type PostListProps = {
  posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid w-full grid-cols-3 gap-1">
      {posts.map((post, index) => {
        return <PostCard date={post.date} key={index} slug={post.slug} title={post.title} />
      })}
    </div>
  )
}

export default PostList
