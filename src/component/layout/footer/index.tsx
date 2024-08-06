import SNSLink from '@/component/element/button/snsLinkButton'
import { SNS_LINKS_VALUES } from '@/constant/sns'

const Footer = () => {
  return (
    <footer className="sticky top-full">
      <div className="container mx-auto h-24 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex space-x-6">
            {SNS_LINKS_VALUES.map((sns, index) => (
              <SNSLink key={index} sns={sns} />
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-4">© 2024 Ura-Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
