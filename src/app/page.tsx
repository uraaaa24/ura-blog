import { getAllArticles, getAllScraps } from '@/lib/api'

import PostList from '../components/postList'

const Home = () => {
  const allArticles = getAllArticles()
  console.log('##########################', allArticles)

  const allScraps = getAllScraps()
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', allScraps)

  return (
    <div className="m-auto w-6/12">
      <h1>Welcome to Next.js!</h1>
      <PostList posts={allArticles} />
    </div>
  )
}

export default Home
