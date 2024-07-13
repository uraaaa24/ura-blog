import CardList from '@/component/element/cardList'
import TagSidebar from '@/component/element/sideBar/tagsSidebar'
import { getAllTags, getArticlesByTag } from '@/util/microcms'

const Category = async ({
  params,
  searchParams
}: {
  params: {
    category: string
  }
  searchParams: {
    page: number
  }
}) => {
  const { category } = params

  const { page } = searchParams
  const currentPage = Number(page) || 1
  const { articles, totalCount, totalPages } = await getArticlesByTag(category, currentPage)

  const tags = await getAllTags()

  return (
    <div className="flex gap-8">
      <div className="w-3/4">
        <CardList articleList={articles} />
      </div>
      <aside className="w-1/4">
        <TagSidebar tags={tags} />
      </aside>
    </div>
  )
}

export default Category
