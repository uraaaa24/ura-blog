import Link from 'next/link'

import { Tag } from '@/type/microcms'

import SearchForm from '../../form/searchForm'

type TagSidebarProps = {
  tags: Tag[]
}

const TagSidebar = (props: TagSidebarProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <SearchForm />
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-lg font-bold">Category</p>
        <div className="flex flex-col gap-4">
          {props.tags.map((tag) => {
            return (
              <Link
                href={`/category/${encodeURIComponent(tag.id)}?page=1`}
                key={tag.name}
                className="text-sm border-b border-gray-300 pb-2"
              >
                {tag.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TagSidebar
