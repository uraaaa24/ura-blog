import Card from '@/components/elements/card'

import { getAllArticles } from '@/utils/microcms'

const Articles = async () => {
  const { contents } = await getAllArticles()

  return (
    <div>
      {contents.map((content) => {
        return <Card key={content.id} title={content.title} createdAt={content.createdAt} />
      })}
    </div>
  )
}

export default Articles
