import Link from 'next/link'

type CategoryTipProps = {
  id: string
  name: string
}

const CategoryTip = (props: CategoryTipProps) => {
  return (
    <Link
      href={`/category/${encodeURIComponent(props.id)}?page=1`}
      className="text-xs rounded-full py-1 px-2 text-white bg-[#e30613] cursor-pointer"
    >
      {props.name}
    </Link>
  )
}

export default CategoryTip
