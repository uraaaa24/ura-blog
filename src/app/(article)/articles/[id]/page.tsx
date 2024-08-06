import Image from 'next/image'

import AuthorBiography from '@/component/element/biography/authorBiography'
import SNSShareButton from '@/component/element/button/snsShareButton'
import RichEditor from '@/component/element/richEditor'
import TableOfContentsSideBar from '@/component/element/sideBar/tableOfContentsSidebar'
import CategoryTip from '@/component/element/tip/categoryTip'
import { generateShareUrl, SNS_SHARE_LINKS_VALUES } from '@/constant/sns'
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
    <article className="rounded-md flex flex-col gap-6">
      <div className="flex w-full gap-6">
        <div>
          <div className="sticky top-0 pt-20 flex flex-col gap-6">
            {SNS_SHARE_LINKS_VALUES.map((sns, index) => (
              <SNSShareButton
                key={index}
                url={generateShareUrl(sns.href, id, data.title)}
                icon={sns.icon}
                alt={sns.alt}
                description={sns.description}
              />
            ))}
          </div>
        </div>

        <div className="w-3/4 flex flex-col bg-white dark:bg-slate-900 py-8 px-12">
          <div className="flex flex-col gap-1.5 mb-2 text-center">
            <p className="text-gray-400">{convertDate(data.createdAt)}</p>
            <h1 className="text-4xl">{data.title}</h1>
            {data.tags && (
              <div className="flex gap-1 justify-center mt-1">
                {data.tags.map((tag, index) => (
                  <CategoryTip key={index} id={tag.id} name={tag.name} />
                ))}
              </div>
            )}
            <div className="relative w-full mt-4 bg-white" style={{ paddingTop: '56.25%' }}>
              <Image
                src={data.eyeCatch?.url ? data.eyeCatch.url : '/static/no-image.png'}
                alt={data.title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <RichEditor body={data.body} />
            <hr className="my-8 border-gray-200" />
            <AuthorBiography />
          </div>
        </div>

        <aside className="w-1/4">
          <TableOfContentsSideBar />
        </aside>
      </div>
    </article>
  )
}

export default Article
