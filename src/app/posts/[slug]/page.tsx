import { notFound } from 'next/navigation'

import PostContent from '@/components/postContent'
import { getAllPosts, getPostBySlug } from '@/lib/post'

import type { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{post.title}</h1>
        <div className="flex flex-wrap items-center text-gray-500">
          <time dateTime={post.date}>{post.formattedDate}</time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap ml-4 gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      <PostContent content={post.content} />
    </article>
  )
}
