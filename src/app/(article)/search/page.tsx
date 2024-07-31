import CardList from '@/component/element/cardList'
import BlogLayout from '@/component/layout/blogLayout'
import { searchArticles } from '@/util/microcms'

export const generateMetadata = ({
  searchParams
}: {
  searchParams: {
    q: string
  }
}) => {
  return {
    title: `${searchParams.q} | Ura Blog`,
    icons: [
      {
        rel: 'icon',
        url: '/my-icon.png'
      }
    ]
  }
}

const Search = async ({
  searchParams
}: {
  searchParams: {
    q: string
    page: number
  }
}) => {
  const { q, page } = searchParams
  const currentPage = Number(page) || 1
  const { articles, totalCount, totalPages } = await searchArticles(q, currentPage)

  return (
    <BlogLayout>
      <div className="py-2 mb-2">
        <p className="text-xl">
          <span className="text-primary">{q}</span> の検索結果
        </p>
      </div>
      {articles.length !== 0 ? (
        <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
      ) : (
        <div className="text-center text-gray-500 text-xl h-40 flex items-center justify-center">
          {q} の検索結果が見つかりませんでした
        </div>
      )}
    </BlogLayout>
  )
}

export default Search
