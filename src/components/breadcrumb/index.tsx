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
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  /
                </span>
              )}

              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-400 font-medium hover:text-gray-600 transition-colors"
                >
                  {label}
                </Link>
              ) : (
                <span className="text-black font-bold">{label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
