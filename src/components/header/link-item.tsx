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
      className={`font-medium hover:text-gray-600 transition-colors ${isActive ? 'text-black font-bold' : 'text-gray-400'}`}
    >
      {label}
    </Link>
  )
}

export default LinkItem
