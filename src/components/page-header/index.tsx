import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  action?: ReactNode
}

const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export default PageHeader
