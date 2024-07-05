import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white border-b-2">
      <div className="container mx-auto flex gap-10 py-4">
        <div>
          <h1 className="text-4xl font-bold">Ura Blog</h1>
        </div>

        <nav className="flex items-center justify-between">
          <ul className="flex gap-8">
            <li>
              <Link href="/articles">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            {/* <li>
              <a href="/contact">Contact</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
