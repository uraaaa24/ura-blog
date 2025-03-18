import type { ReactNode } from 'react'

type MDTableProps = {
  children: ReactNode
}

export const MDTable = ({ children }: MDTableProps) => {
  return <table className="border-collapse border border-gray-300">{children}</table>
}

export const MDTableBody = ({ children }: MDTableProps) => {
  return <tbody className="divide-y divide-gray-300">{children}</tbody>
}

export const MDTableRow = ({ children }: MDTableProps) => {
  return <tr className="border border-gray-300">{children}</tr>
}

export const MDTableHead = ({ children }: MDTableProps) => {
  return <thead className="bg-gray-100">{children}</thead>
}

export const MDTableHeadCell = ({ children }: MDTableProps) => {
  return <th className="border border-gray-300 p-3 text-center">{children}</th>
}

export const MDTableCell = ({ children }: MDTableProps) => {
  return <td className="border border-gray-300 p-3">{children}</td>
}
