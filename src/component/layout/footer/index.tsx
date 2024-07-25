import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto h-24 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex space-x-4">
            <a
              href="https://github.com/uraaaa24"
              target="_blank"
              // className="rounded-full p-2 hover:bg-[#d4c2e8] dark:hover:bg-[#6e5b80] transition-all duration-200"
              className="rounded-full p-2 hover:bg-[#d4c2e8] transition-all duration-200"
            >
              <Image src="/icons/github.svg" width={20} height={20} alt="GitHub" />
            </a>
            <a
              href="https://x.com/__ars____24"
              target="_blank"
              // className="rounded-full p-2 hover:bg-[#cccccc] dark:hover:bg-[#4d4d4d] transition-all duration-200"
              className="rounded-full p-2 hover:bg-[#cccccc] transition-all duration-200"
            >
              <Image src="/icons/x.svg" width={20} height={20} alt="X" />
            </a>
            <a
              href="https://zenn.dev/uraaaa24"
              target="_blank"
              // className="rounded-full p-2 hover:bg-[#cce7ff] dark:hover:bg-[#3b6e99] transition-all duration-200"
              className="rounded-full p-2 hover:bg-[#cce7ff] transition-all duration-200"
            >
              <Image src="/icons/zenn.svg" width={20} height={20} alt="Zenn" />
            </a>
            <a
              href="#"
              target="_self"
              // className="rounded-full p-2 hover:bg-[#ffcc99] dark:hover:bg-[#996633] transition-all duration-200"
              className="rounded-full p-2 hover:bg-[#ffcc99] transition-all duration-200"
            >
              <Image src="/icons/rss.svg" width={20} height={20} alt="RSS" />
            </a>
          </div>
          <p className="text-gray-500 text-xs mt-2">© 2024 Ura-Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
