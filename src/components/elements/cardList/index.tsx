import { Article } from '@/types/microcms'

import Card from './card'

type CardListProps = {
  articleList: Article[]
}

const CardList = (props: CardListProps) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {props.articleList.map((article) => (
        <Card
          key={article.id}
          id={article.id}
          title={article.title}
          eyeCatch={article.eyeCatch}
          createdAt={article.createdAt}
        />
      ))}
    </div>
  )
}

export default CardList
