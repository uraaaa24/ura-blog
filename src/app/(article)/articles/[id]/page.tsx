import RichEditor from '@/component/element/richEditor'
import TableOfContentsSideBar from '@/component/element/sideBar/tableOfContentsSidebar'
import CategoryTip from '@/component/element/tip/categoryTip'
import { convertDate } from '@/util'
import { getArticleById } from '@/util/microcms'

const Article = async ({
  params
}: {
  params: {
    id: string
  }
}) => {
  const { id } = params
  const data = await getArticleById(id)

  return (
    <article className="rounded-sm flex flex-col gap-6">
      <div className="flex w-full gap-6">
        <div className="w-3/4 flex flex-col bg-white py-6 px-10">
          <div className="flex flex-col gap-1.5 mb-2 text-center">
            <p className="text-gray-500">{convertDate(data.createdAt)}</p>
            <h1 className="text-4xl font-bold">{data.title}</h1>
            {data.tags && (
              <div className="flex gap-1 justify-center mt-1">
                {data.tags.map((tag, index) => (
                  <CategoryTip key={index} id={tag.id} name={tag.name} />
                ))}
              </div>
            )}
          </div>
          <RichEditor body={data.body} />
        </div>
        <aside className="w-1/4">
          <TableOfContentsSideBar />
        </aside>
      </div>
    </article>
  )
}

export default Article
