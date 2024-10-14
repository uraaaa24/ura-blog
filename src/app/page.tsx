import { getAllArticles, getAllScraps } from '@/lib/api'

import PostList from '../components/postList'

const Home = () => {
  const allArticles = getAllArticles()
  console.log('##########################', allArticles)

  const allScraps = getAllScraps()
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', allScraps)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold text-center mb-2">Article</h1>
        <PostList posts={allArticles} />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center mb-2">Scrap</h1>
        <PostList posts={allScraps} />
      </div>
    </div>
  )
}

export default Home
