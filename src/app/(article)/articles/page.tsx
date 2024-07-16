import CardList from '@/component/element/cardList'
import TagSidebar from '@/component/element/sideBar/tagsSidebar'
import { getAllArticles } from '@/util/microcms'

const Articles = async () => {
  const articleList = await getAllArticles()

  return (
    <div className="flex gap-8">
      <div className="w-3/4">
        <CardList articleList={articleList} />
      </div>
      <aside className="w-1/4">
        <TagSidebar />
      </aside>
    </div>
  )
}

export default Articles
