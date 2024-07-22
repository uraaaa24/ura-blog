import Image from 'next/image'

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
    <article className="rounded-sm flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="flex w-full gap-6">
        <div className="w-3/4 flex flex-col gap-10 bg-white py-6 px-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1.5 mb-2">
              <p className="text-gray-500">{convertDate(data.createdAt)}</p>
              <h1 className="text-4xl font-bold">{data.title}</h1>
              {data.tags && (
                <div className="flex gap-1">
                  {data.tags.map((tag, index) => (
                    <CategoryTip key={index} id={tag.id} name={tag.name} />
                  ))}
                </div>
              )}
            </div>
            <Image
              src={data.eyeCatch?.url ?? '/static/no-image.png'}
              alt="アイキャッチ"
              width={data.eyeCatch?.width ?? 600}
              height={data.eyeCatch?.height ?? 450}
              style={{ maxHeight: 400, width: '100%', objectFit: 'cover' }}
              loading="eager"
              priority
            />
          </div>
          <RichEditor body={data.body} />
        </div>
        <aside className="w-1/4">
          {/* TODO: 目次用のサイドバーを作成する */}
          <TableOfContentsSideBar />
        </aside>
      </div>
    </article>
  )
}

export default Article
