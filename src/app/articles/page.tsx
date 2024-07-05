import CardList from '@/components/elements/cardList'

import { getAllArticles } from '@/utils/microcms'

const Articles = async () => {
  const articleList = await getAllArticles()

  return (
    <div className="flex min-h-screen">
      <div className="w-3/4 flex-grow">
        <CardList articleList={articleList} />
      </div>
      {/* TODO: カテゴリー(タグ)を使った検索フォームを作成する */}
      {/* <aside className="w-1/4 flex flex-col">
        <p>サイドバー</p>
      </aside> */}
    </div>
  )
}

export default Articles
