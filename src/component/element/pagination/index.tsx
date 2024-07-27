'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ICON_SIZE } from '@/constant/icon'

type PaginationProps = {
  currentPage: number
  totalPage: number
}

const Pagination = (props: PaginationProps) => {
  const router = useRouter()

  const pages = Array.from({ length: props.totalPage }, (_, i) => i + 1)

  const handleClick = (page: number) => {
    router.push(`/articles?page=${page}`)
  }

  return (
    <div className="flex items-center gap-4">
      <button
        disabled={props.currentPage === 1}
        onClick={() => handleClick(props.currentPage - 1)}
        className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase rounded-full transition-all duration-200 enabled:hover:bg-[#e30613] enabled:hover:text-white disabled:opacity-50"
      >
        <ArrowLeft size={ICON_SIZE.SMALL} />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`relative h-10 w-10 rounded-full text-xs uppercase transition-all duration-200 disabled:opacity-50 disabled:shadow-none ${
              page === props.currentPage
                ? 'bg-[#e30613] text-white shadow-md hover:shadow-gray-900/30'
                : 'hover:bg-[#e30613] hover:text-white '
            }`}
            onClick={() => {
              if (page === props.currentPage) return

              handleClick(page)
            }}
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{page}</span>
          </button>
        ))}
      </div>

      <button
        disabled={props.currentPage === props.totalPage}
        onClick={() => handleClick(props.currentPage + 1)}
        className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase rounded-full transition-all duration-200 enabled:hover:bg-[#e30613] enabled:hover:text-white disabled:opacity-50"
      >
        Next
        <ArrowRight size={ICON_SIZE.SMALL} />
      </button>
    </div>
  )
}

export default Pagination
