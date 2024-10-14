import { getAllArticles, getAllScraps } from '@/lib/api'

const Home = () => {
  const allArticles = getAllArticles()
  console.log('##########################', allArticles)

  const allScraps = getAllScraps()
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', allScraps)

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
    </div>
  )
}

export default Home
