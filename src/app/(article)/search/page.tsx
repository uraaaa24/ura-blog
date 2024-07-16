import CardList from '@/component/element/cardList'
import { searchArticles } from '@/util/microcms'

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
      <CardList articleList={articles} />
    </div>
  )
}

export default Search
