import { LabelItem } from '@/context/tagContext'
import { TagProvider } from '@/provider/tagProvider'
import { getAllTags } from '@/util/microcms'

type ArticleLayoutProps = {
  children: React.ReactNode
}

const ArticleLayout = async (props: ArticleLayoutProps) => {
  const tags = await getAllTags()
  const allTags: LabelItem[] = tags.map((tag) => ({ id: tag.id, name: tag.name }))

  // NOTE: ページ全体で保持したいデータは以下のようにProviderでラップする
  return <TagProvider allTags={allTags}>{props.children}</TagProvider>
}

export default ArticleLayout
