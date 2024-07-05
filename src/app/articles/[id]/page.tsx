import Image from 'next/image'

import { convertDate } from '@/utils'
import { getArticleById } from '@/utils/microcms'

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
    <article className="max-w-screen-lg mx-auto bg-white px-6 py-8 rounded-lg flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center">{data.title}</h1>
        <p className="text-center text-gray-500">{convertDate(data.createdAt)}</p>
        <Image
          src={data.eyeCatch?.url ?? '/static/no-image.png'}
          alt="アイキャッチ"
          // 画面の横幅に合わせる
          width={data.eyeCatch?.width ?? 600}
          height={data.eyeCatch?.height ?? 450}
          style={{ maxHeight: 450, width: '100%', objectFit: 'contain' }}
          loading="eager"
          priority
        />
      </div>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${data.body}`
          }}
        />
      </div>
    </article>
  )
}

export default Article
