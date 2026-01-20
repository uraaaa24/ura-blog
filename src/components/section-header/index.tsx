import Link from 'next/link'

type SectionHeaderProps = {
  title: string
  description?: string
  href?: string
  linkLabel?: string
}

const SectionHeader = ({
  title,
  description,
  href,
  linkLabel = 'View all →'
}: SectionHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {description ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  )
}

export default SectionHeader
