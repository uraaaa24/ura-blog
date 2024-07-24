import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-[#151925] border-t-2 py-4">
      <div className="max-w-7xl mx-auto py-4 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          <a
            href="https://github.com/uraaaa24"
            target="_blank"
            className="rounded-full p-3 hover:bg-[#d4c2e8] dark:hover:bg-[#6e5b80] transition-all duration-200"
          >
            <Image src="/icons/github.svg" width={24} height={24} alt="GitHub" className="dark:invert" />
          </a>
          <a
            href="https://x.com/__ars____24"
            target="_blank"
            className="rounded-full p-3 hover:bg-[#cccccc] dark:hover:bg-[#4d4d4d] transition-all duration-200"
          >
            <Image src="/icons/x.svg" width={24} height={24} alt="X" className="dark:invert" />
          </a>
          <a
            href="https://zenn.dev/uraaaa24"
            target="_blank"
            className="rounded-full p-3 hover:bg-[#cce7ff] dark:hover:bg-[#3b6e99] transition-all duration-200"
          >
            <Image src="/icons/zenn.svg" width={24} height={24} alt="Zenn" className="dark:invert" />
          </a>
          <a
            href="#"
            target="_self"
            className="rounded-full p-3 hover:bg-[#ffcc99] dark:hover:bg-[#996633] transition-all duration-200"
          >
            <Image src="/icons/rss.svg" width={24} height={24} alt="RSS" className="dark:invert" />
          </a>
        </div>
        <p className="text-gray-500 text-sm">© 2024 Ura-Blog. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
