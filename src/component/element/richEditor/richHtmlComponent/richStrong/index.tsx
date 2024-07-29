import { mPlusRounded1c800 } from '@/constant/font'
import { RichHtmlComponent } from '@/type'

type RichStrongProps = RichHtmlComponent

const RichStrong = (props: RichStrongProps) => {
  return <strong className={`${mPlusRounded1c800.className}`}>{props.children}</strong>
}

export default RichStrong
