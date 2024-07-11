import Link from 'next/link'

type CategoryTipProps = {
  name: string
}

const CategoryTip = (props: CategoryTipProps) => {
  const encodedName = encodeURIComponent(props.name)

  return (
    // <div className="text-sm border-b border-gray-300 pb-2">{props.name}</div>
    <Link
      href={`/search?category=${encodedName}`}
      className="text-xs rounded-full py-1 px-2 text-white bg-[#e30613] cursor-pointer"
    >
      {props.name}
    </Link>
  )
}

export default CategoryTip
