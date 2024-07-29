import Breadcrumb from '@/component/element/breadcrumb'
import CardList from '@/component/element/cardList'
import TagSidebar from '@/component/element/sideBar/tagsSidebar'
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
    <div className="flex gap-8">
      <div className="w-3/4">
        <div className="mb-2">
          <Breadcrumb />
        </div>
        <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
      </div>
      <aside className="w-1/4">
        <TagSidebar />
      </aside>
    </div>
  )
}

export default Category
