import Breadcrumb from '@/component/element/breadcrumb'
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

  // TODO: labelがidのままなので、名前が表示されるように修正する
  const breadcrumbItems = [{ label: category, href: `/category/${category}` }]

  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-1 w-3/4">
        <Breadcrumb items={breadcrumbItems} />
        <CardList articleList={articles} />
      </div>
      <aside className="w-1/4">
        <TagSidebar tags={tags} />
      </aside>
    </div>
  )
}

export default Category
