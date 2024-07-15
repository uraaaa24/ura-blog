import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const breadcrumbItems = [{ label: 'Home', href: '/articles' }, ...props.items]

  return (
    <nav>
      <ul className="flex items-center gap-1 break-words text-sm">
        {breadcrumbItems.map((item, index) => {
          return (
            <li key={index}>
              {/* itemsの最後は、hrefをつけない */}
              {index === breadcrumbItems.length - 1 ? (
                item.label
              ) : (
                <div className="flex gap-1 items-center">
                  <Link href={item.href} className="hover:text-[#e30613] transition-all duration-300">
                    {item.label}
                  </Link>
                  <ChevronRight size={16} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb
