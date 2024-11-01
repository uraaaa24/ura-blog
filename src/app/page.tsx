import { getAllArticles } from '@/lib/api'

import ArticleList from './articles/_components/articleList'

const Home = () => {
  const allArticles = getAllArticles()

  // const allScraps = getAllScraps()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="my-2 text-center text-4xl font-bold">Articles</h1>
        <ArticleList posts={allArticles} />
      </div>
      {/* <div>
        <h1 className="mb-2 text-center text-4xl font-bold">Scraps</h1>
        <ArticleList posts={allScraps} />
      </div> */}
    </div>
  )
}

export default Home
