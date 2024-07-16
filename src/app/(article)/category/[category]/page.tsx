import Breadcrumb from '@/component/element/breadcrumb'
import CardList from '@/component/element/cardList'
import { getArticlesByTag } from '@/util/microcms'

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

  return (
    <div className="flex flex-col gap-1 w-full">
      <Breadcrumb />
      <CardList articleList={articles} />
    </div>
  )
}

export default Category
