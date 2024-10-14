import { getAllPosts } from '@/lib/api'

const Home = () => {
  const allPosts = getAllPosts()

  console.log(allPosts)

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
    </div>
  )
}

export default Home
