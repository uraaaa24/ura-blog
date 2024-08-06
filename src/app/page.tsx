import { redirect } from 'next/navigation'

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

const Page = () => {
  redirect('/blog')
}

export default Page
