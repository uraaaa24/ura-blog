import { getAllArticles, getAllScraps } from '@/lib/api'

import ArticleList from '../components/article/articleList'

const Home = () => {
  const allArticles = getAllArticles()
  console.log('##########################', allArticles)

  const allScraps = getAllScraps()
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', allScraps)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold text-center mb-2">Articles</h1>
        <ArticleList posts={allArticles} />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center mb-2">Scraps</h1>
        <ArticleList posts={allScraps} />
      </div>
    </div>
  )
}

export default Home
