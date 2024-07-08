import CardList from '@/component/element/cardList'
import TagSidebar from '@/component/element/sideBar/tagsSidebar'
import { getAllArticles, getAllTags } from '@/util/microcms'

const Articles = async () => {
  const articleList = await getAllArticles()
  const tags = await getAllTags()

  return (
    <div className="flex gap-8">
      <div className="w-3/4 flex-grow">
        <CardList articleList={articleList} />
      </div>
      <aside className="w-1/4">
        <TagSidebar tags={tags} />
      </aside>
    </div>
  )
}

export default Articles
