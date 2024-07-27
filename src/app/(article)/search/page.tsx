import CardList from '@/component/element/cardList'
import SearchForm from '@/component/element/form/searchForm'
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
        url: '/my-icon.jpeg'
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
    <div className="w-full">
      <div className="mb-4">
        <SearchForm />
      </div>
      {articles.length !== 0 ? (
        <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
      ) : (
        <div className="text-center text-gray-500 text-xl h-40 flex items-center justify-center">
          {q} の検索結果が見つかりませんでした
        </div>
      )}
    </div>
  )
}

export default Search
