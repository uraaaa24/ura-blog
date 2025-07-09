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
      className={`
        font-medium transition-colors duration-200
        ${
          isActive
            ? 'text-gray-900 dark:text-gray-100 font-bold'
            : 'text-gray-400 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }
      `}
    >
      {label}
    </Link>
  )
}

export default LinkItem
