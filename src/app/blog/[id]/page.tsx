import Image from 'next/image'

import AuthorBiography from '@/component/element/biography/authorBiography'
import RichEditor from '@/component/element/richEditor'
import TableOfContents from '@/component/element/tableOfContents'
import CategoryTip from '@/component/element/tip/categoryTip'
import { convertDate } from '@/util'
import { getArticleById } from '@/util/microcms'

export const generateMetadata = async ({
  params
}: {
  params: {
    id: string
  }
}) => {
  const { title } = await getArticleById(params.id)

  return {
    title: `${title} | Ura Blog`,
    icons: [
      {
        rel: 'icon',
        url: '/my-icon.png'
      }
    ]
  }
}

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
    <article className="rounded-lg flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex w-full gap-6">
        <div className="w-9/12 flex flex-col rounded-lg bg-white dark:bg-slate-900 py-8 px-12">
          <div className="flex flex-col gap-1.5 mb-2 text-center">
            <p className="text-slate-400">{convertDate(data.createdAt)}</p>
            <h1 className="text-4xl dark:text-white">{data.title}</h1>
            {data.tags && (
              <div className="flex gap-1 justify-center mt-1">
                {data.tags.map((tag, index) => (
                  <CategoryTip key={index} id={tag.id} name={tag.name} />
                ))}
              </div>
            )}
            <div className="relative w-full mt-4 rounded-lg bg-white" style={{ paddingTop: '56.25%' }}>
              <Image
                src={data.eyeCatch?.url ? data.eyeCatch.url : '/static/no-image.png'}
                alt={data.title}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8">
            <RichEditor body={data.body} />
            <hr className="my-8 border-gray-200" />
            <AuthorBiography />
          </div>
        </div>

        <aside className="w-3/12">
          <TableOfContents />
        </aside>
      </div>
    </article>
  )
}

export default Article
