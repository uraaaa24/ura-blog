import Image from 'next/image'

import RichEditor from '@/component/element/richEditor'
import ContentsSideBar from '@/component/element/sideBar/contentsSidebar'
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
    <div className="flex gap-8">
      <article className="w-3/4 max-w-screen-lg mx-auto px-6 py-8 rounded-sm flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center">{data.title}</h1>
          <p className="text-center text-gray-500">{convertDate(data.createdAt)}</p>
          <Image
            src={data.eyeCatch?.url ?? '/static/no-image.png'}
            alt="アイキャッチ"
            width={data.eyeCatch?.width ?? 600}
            height={data.eyeCatch?.height ?? 450}
            style={{ maxHeight: 450, width: '100%', objectFit: 'contain' }}
            loading="eager"
            priority
          />
        </div>
        <div>
          <RichEditor body={data.body} />
        </div>
      </article>
      <aside className="w-1/4">
        <ContentsSideBar />
      </aside>
    </div>
  )
}

export default Article
