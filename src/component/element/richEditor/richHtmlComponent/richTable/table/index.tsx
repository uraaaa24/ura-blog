import { RichHtmlComponent } from '@/type'

type RichTableProps = RichHtmlComponent

const RichTable = (props: RichTableProps) => {
  return <table className="min-w-full border-collapse table-auto">{props.children}</table>
}

export default RichTable
