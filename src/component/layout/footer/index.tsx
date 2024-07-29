import SNSLink from '@/component/element/link/snsLink'
import { SNS_LINKS } from '@/constant/about'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black dark:text-gray-100">
      <div className="container mx-auto h-24 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex space-x-4">
            <SNSLink sns={SNS_LINKS.Github} />
            <SNSLink sns={SNS_LINKS.X} />
            <SNSLink sns={SNS_LINKS.Zenn} />
            {/* <a
              href="#"
              target="_self"
              // className="rounded-full p-2 hover:bg-[#ffcc99] dark:hover:bg-[#996633] transition-all duration-200"
              className="rounded-full p-2 hover:bg-[#ffcc99] transition-all duration-200"
            >
              <Image src="/icons/rss.svg" width={ICON_SIZE.MEDIUM} height={ICON_SIZE.MEDIUM} alt="RSS" />
            </a> */}
          </div>
          <p className="text-gray-500 text-xs mt-2">© 2024 Ura-Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
