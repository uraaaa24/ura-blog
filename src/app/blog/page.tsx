import CardList from '@/component/element/cardList'
import Container from '@/component/layout/container'
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
    <Container>
      <div className="px-16">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <CardList articleList={articles} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} />
      </div>
    </Container>
  )
}

export default Articles
