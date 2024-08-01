import { ReactNode } from 'react'

import TagSidebar from '@/component/element/sideBar/tagsSidebar'

type BlogLayoutProps = {
  children: ReactNode
}

const BlogLayout = (props: BlogLayoutProps) => {
  return (
    <div className="flex gap-8">
      <div className="w-3/4">{props.children}</div>
      <aside className="w-1/4">
        <TagSidebar />
      </aside>
    </div>
  )
}

export default BlogLayout
