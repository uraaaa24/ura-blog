import CardList from '@/component/element/cardList'
import TagSidebar from '@/component/element/sideBar/tagsSidebar'
import { getAllArticles } from '@/util/microcms'

const Articles = async ({
  searchParams
}: {
  searchParams: {
    page?: string
  }
}) => {
  const currentPage = Number(searchParams.page) || 1

  const { articles, totalCount, totalPages } = await getAllArticles(currentPage)

  return (
    <div className="flex gap-8">
      <div className="w-3/4">
        <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
      </div>
      <aside className="w-1/4">
        <TagSidebar />
      </aside>
    </div>
  )
}

export default Articles
