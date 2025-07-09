import type { ReactNode } from 'react'

type MDTableProps = {
  children: ReactNode
}

export const MDTable = ({ children }: MDTableProps) => {
  return <table className="border-collapse">{children}</table>
}

export const MDTableBody = ({ children }: MDTableProps) => {
  return <tbody className="divide-y divide-gray-300 dark:divide-gray-600">{children}</tbody>
}

export const MDTableRow = ({ children }: MDTableProps) => {
  return <tr className="border border-gray-300 dark:border-gray-600">{children}</tr>
}

export const MDTableHead = ({ children }: MDTableProps) => {
  return <thead className="bg-gray-100 dark:bg-[#374151]">{children}</thead>
}

export const MDTableHeadCell = ({ children }: MDTableProps) => {
  return <th className="border border-gray-300 dark:border-gray-600 p-3 text-center">{children}</th>
}

export const MDTableCell = ({ children }: MDTableProps) => {
  return <td className="border border-gray-300 dark:border-gray-600 p-3">{children}</td>
}
