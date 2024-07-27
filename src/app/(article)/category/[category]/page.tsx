import Breadcrumb from '@/component/element/breadcrumb'
import CardList from '@/component/element/cardList'
import { getArticlesByTag, getTagNameById } from '@/util/microcms'

export const generateMetadata = async ({
  params
}: {
  params: {
    category: string
  }
}) => {
  const { name } = await getTagNameById(params.category)

  return {
    title: `${name} | Ura Blog`,
    icons: [
      {
        rel: 'icon',
        url: '/my-icon.jpeg'
      }
    ]
  }
}

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
    <div className="flex flex-col gap-2 w-full">
      <Breadcrumb />
      <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
    </div>
  )
}

export default Category
