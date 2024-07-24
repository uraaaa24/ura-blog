import { RichHtmlComponent } from '@/type'

type RichHeadingProps = RichHtmlComponent

const RichHeading1 = (props: RichHeadingProps) => {
  return (
    <h1 id={props.id} className="text-4xl font-semibold mt-12 mb-8">
      {props.children}
    </h1>
  )
}

export default RichHeading1
