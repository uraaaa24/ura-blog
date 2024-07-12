'use client'

import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ICON_SIZE } from '@/constant/icon'

const SearchForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchWord, setSearchWord] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = searchWord.trim()

    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}&page=1`)
    }
  }

  const handleClear = () => {
    setSearchWord('')
  }

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchWord(query)
    }
  }, [searchParams])

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          className="w-full border border-gray-300 rounded-sm p-2 pr-8 focus:border-[#e30613] focus:outline-none focus:ring-[#e30613]"
        />
        {searchWord && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={ICON_SIZE.MEDIUM} />
          </button>
        )}
      </div>
      <button className="bg-[#e30613] text-white rounded-sm p-2 ">
        <Search size={ICON_SIZE.MEDIUM} />
      </button>
    </form>
  )
}

export default SearchForm
