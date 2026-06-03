type SectionHeaderProps = {
  title: string
  description?: string
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="mb-4 space-y-1">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {description ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

export default SectionHeader
