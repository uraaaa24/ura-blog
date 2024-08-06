import { notoSansJP700 } from '@/constant/font'
import { RichHtmlComponent } from '@/type'

type RichStrongProps = RichHtmlComponent

const RichStrong = (props: RichStrongProps) => {
  return <strong className={`${notoSansJP700.className}`}>{props.children}</strong>
}

export default RichStrong
