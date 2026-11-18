import Link from 'next/link'

type LinkItemProps = {
  isActive: boolean
  href: string
  label: string
}

const LinkItem = ({ isActive, href, label }: LinkItemProps) => {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={isActive ? 'page' : undefined}
      className={`font-medium transition-colors duration-200 ${
        isActive
          ? 'font-bold text-gray-900 dark:text-gray-100'
          : 'text-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
      } `}
    >
      {label}
    </Link>
  )
}

export default LinkItem
