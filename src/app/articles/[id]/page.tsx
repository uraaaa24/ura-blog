import Image from 'next/image'

import RichEditor from '@/component/element/richEditor'
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
    <article className="max-w-6xl mx-auto px-6 rounded-sm flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1.5 mb-2">
          <p className="text-gray-500">{convertDate(data.createdAt)}</p>
          <h1 className="text-4xl font-bold">{data.title}</h1>
          {data.tags && (
            <div className="flex gap-1">
              {data.tags.map((tag, index) => (
                // TODO: チップで別コンポーネントに切り出す
                <span key={index} className="text-sm text-gray-500">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <Image
          src={data.eyeCatch?.url ?? '/static/no-image.png'}
          alt="アイキャッチ"
          width={data.eyeCatch?.width ?? 600}
          height={data.eyeCatch?.height ?? 450}
          style={{ maxHeight: 500, width: '100%', objectFit: 'cover' }}
          loading="eager"
          priority
        />
      </div>
      <div className="flex w-full gap-6">
        <div className="w-full">
          <RichEditor body={data.body} />
        </div>
        {/* TODO: 目次用のコンポーネントを実装する */}
        {/* <aside className="w-1/4">
          <ContentsSideBar />
        </aside> */}
      </div>
    </article>
  )
}

export default Article
