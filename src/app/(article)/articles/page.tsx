import CardList from '@/component/element/cardList'
import BlogLayout from '@/component/layout/blogLayout'
import { getArticles } from '@/util/microcms'

export const generateMetadata = () => {
  return {
    title: 'Home | Ura Blog',
    icons: [
      {
        rel: 'icon',
        url: '/my-icon.png'
      }
    ]
  }
}

const Articles = async ({
  searchParams
}: {
  searchParams: {
    page?: string
  }
}) => {
  const currentPage = Number(searchParams.page) || 1

  const { articles, totalCount, totalPages } = await getArticles(currentPage)

  return (
    <BlogLayout>
      <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
    </BlogLayout>
  )
}

export default Articles
