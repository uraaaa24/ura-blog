import SNSLink from '@/component/element/link/snsLink'
import { SNS_LINKS_VALUES } from '@/constant/sns'

const Footer = () => {
  return (
    <footer className="sticky top-full bg-white dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto h-24 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex space-x-4">
            {SNS_LINKS_VALUES.map((sns, index) => (
              <SNSLink key={index} sns={sns} />
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-2">© 2024 Ura-Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
