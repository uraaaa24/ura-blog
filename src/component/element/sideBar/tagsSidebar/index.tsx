import { Tag } from '@/type/microcms'

type TagSidebarProps = {
  tags: Tag[]
}

const TagSidebar = (props: TagSidebarProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {/* TODO: 別コンポーネントに切り出す */}
        <input type="text" placeholder="Search..." className="w-full border border-gray-300 rounded p-2" />
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-lg font-bold">Category</p>
        <div className="flex flex-col gap-4">
          {props.tags.map((tag) => {
            return (
              <div key={tag.name} className="text-sm border-b border-gray-300 pb-2">
                {tag.name}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TagSidebar
