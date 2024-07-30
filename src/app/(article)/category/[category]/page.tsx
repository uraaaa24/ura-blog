import Breadcrumb from '@/component/element/breadcrumb'
import CardList from '@/component/element/cardList'
import BlogLayout from '@/component/layout/blogLayout'
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
        url: '/my-icon.png'
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
  const { name } = await getTagNameById(category)

  const { page } = searchParams
  const currentPage = Number(page) || 1
  const { articles, totalCount, totalPages } = await getArticlesByTag(category, currentPage)

  return (
    <BlogLayout>
      <div className="mb-2">
        <Breadcrumb categoryName={name} />
      </div>
      <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
    </BlogLayout>
  )
}

export default Category
