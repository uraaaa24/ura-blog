import Link from 'next/link'

import { RichHtmlComponent } from '@/type'

type RichLinkProps = RichHtmlComponent & {
  href: string
}

const RichLink = (props: RichLinkProps) => {
  return (
    <Link href={props.href} className="text-[#e30613] hover:underline">
      {props.children}
    </Link>
  )
}

export default RichLink
