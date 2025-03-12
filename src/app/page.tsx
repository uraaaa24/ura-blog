import { getAllPosts } from '@/lib/post'
import Link from 'next/link'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">最新の記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border border-gray-200 rounded-lg p-6 transition duration-200 hover:-translate-y-1"
          >
            <Link href={`/posts/${post.slug}`} className="block h-full">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
                <time dateTime={post.date}>{post.formattedDate}</time>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap ml-4 gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
