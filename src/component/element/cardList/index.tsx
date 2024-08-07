'use client'

import { Article } from '@/type/microcms'

import Pagination from '../pagination'

import Card from './card'

type CardListProps = {
  articleList: Article[]
  totalCount: number
  totalPages: number
  currentPage: number
}

const CardList = (props: CardListProps) => {
  const maxArticlesPerPage = 4
  const emptySlots = Math.max(0, maxArticlesPerPage - props.articleList.length)

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        {props.articleList.map((article) => (
          <Card
            key={article.id}
            id={article.id}
            title={article.title}
            eyeCatch={article.eyeCatch}
            createdAt={article.createdAt}
            tags={article.tags}
          />
        ))}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div key={`empty-${index}`} className="h-60" />
        ))}
      </div>

      {props.totalPages > 4 && (
        <div className="mt-10 flex justify-center">
          <Pagination currentPage={props.currentPage} totalPage={props.totalPages} />
        </div>
      )}
    </>
  )
}

export default CardList
