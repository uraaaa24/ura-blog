import { RichHtmlComponent } from '@/type'

type RichUnderLineProps = RichHtmlComponent

const RichUnderLine = (props: RichUnderLineProps) => {
  return (
    <u className="underline decoration-[0.5em] decoration-[rgba(227,6,19,0.4)] underline-offset-[-0.2em] [text-decoration-skip-ink:none]">
      {props.children}
    </u>
  )
}

export default RichUnderLine
