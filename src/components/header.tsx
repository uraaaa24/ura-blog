import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white p-3 mt-8 rounded-full w-fit mx-auto fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/* <h1 className="text-2xl font-bold">
            <Link href="/" className="hover:text-gray-600 transition-colors">My Blog</Link>
          </h1> */}
          <nav className="mt-4 sm:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="font-medium  hover:text-gray-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-medium text-gray-500 hover:text-gray-600 transition-colors"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-medium text-gray-500 hover:text-gray-600 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
