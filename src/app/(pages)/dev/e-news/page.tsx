import NewsPageContent from '@/features/news/components/news-page-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'English Reading - Sports, Coffee, Health & Tech',
  description:
    'English articles about sports, coffee, health, and technology. From VOA Learning English, BBC Sport, and more.'
}

const NewsPage = () => {
  return <NewsPageContent />
}

export default NewsPage
