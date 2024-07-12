import { Search } from 'lucide-react'

const SearchForm = () => {
  // TODO: 検索処理を実装する

  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full border border-gray-300 rounded-sm p-2 focus:border-[#e30613] focus:outline-none focus:ring-[#e30613]"
      />
      <button>
        <Search size={24} />
      </button>
    </div>
  )
}

export default SearchForm
