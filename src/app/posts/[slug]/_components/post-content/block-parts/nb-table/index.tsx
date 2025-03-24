import type { ReactNode } from 'react'

type NBTableProps = {
  children: ReactNode
}

export const NBTable = ({ children }: NBTableProps) => {
  return <table className="border-collapse border border-gray-300">{children}</table>
}

export const NBTableBody = ({ children }: NBTableProps) => {
  return <tbody className="divide-y divide-gray-300">{children}</tbody>
}

export const NBTableRow = ({ children }: NBTableProps) => {
  return <tr className="border border-gray-300">{children}</tr>
}

export const NBTableHead = ({ children }: NBTableProps) => {
  return <thead className="bg-gray-100">{children}</thead>
}

export const NBTableHeadCell = ({ children }: NBTableProps) => {
  return <th className="border border-gray-300 p-3 text-center">{children}</th>
}

export const NBTableCell = ({ children }: NBTableProps) => {
  return <td className="border border-gray-300 p-3">{children}</td>
}
