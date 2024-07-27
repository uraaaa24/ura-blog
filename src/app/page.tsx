import { redirect } from 'next/navigation'

export const generateMetadata = () => {
  return {
    title: 'Home | Ura Blog',
    icons: [
      {
        rel: 'icon',
        url: '/my-icon.jpeg'
      }
    ]
  }
}

const Page = () => {
  redirect('/articles')
}

export default Page
