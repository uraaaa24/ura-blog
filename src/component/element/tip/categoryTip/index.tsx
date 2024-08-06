'use client'

import { useRouter } from 'next/navigation'

import { LabelItem } from '@/context/tagContext'

type CategoryTipProps = {
  id: string
  name: string
}

const CategoryTip = (props: CategoryTipProps) => {
  const router = useRouter()

  const handleClick = (tag: LabelItem) => {
    router.push(`/category/${encodeURIComponent(tag.id)}?page=1`)
  }

  return (
    <div
      // onClick={() => handleClick({ id: props.id, name: props.name })}
      className="text-left text-xs rounded-full py-1 px-2 text-white bg-primary"
    >
      {props.name}
    </div>
  )
}

export default CategoryTip
