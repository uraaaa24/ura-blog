'use client'

import { useRouter } from 'next/navigation'

import { LabelItem, useTagContext } from '@/context/tagContext'

import SearchForm from '../../form/searchForm'

const TagSidebar = () => {
  const router = useRouter()

  const { allTags, setSelectedTag } = useTagContext()

  const handleClick = (tag: LabelItem) => {
    setSelectedTag(tag)
    router.push(`/category/${encodeURIComponent(tag.id)}?page=1`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <SearchForm />
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-lg font-bold">Category</p>
        <div className="flex flex-col gap-4">
          {allTags.map((tag) => {
            return (
              <button
                key={tag.id}
                onClick={() => handleClick(tag)}
                className="text-left text-sm hover:text-[#e30613] transition-all duration-300 border-b-2 pb-1"
              >
                {tag.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TagSidebar
