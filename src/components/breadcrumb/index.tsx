import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumbs" className="mb-8">
      <ol className="flex items-center space-x-1 text-sm">
        {items.map((item, index) => {
          const key = `breadcrumb-item-${index}`

          const label = item.label.length > 30 ? `${item.label.slice(0, 30)}...` : item.label

          return (
            <li key={key} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400 dark:text-gray-500" aria-hidden="true">
                  /
                </span>
              )}

              {item.href ? (
                <Link
                  href={item.href}
                  className="font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {label}
                </Link>
              ) : (
                <span className="font-bold text-gray-900 dark:text-gray-100">{label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
