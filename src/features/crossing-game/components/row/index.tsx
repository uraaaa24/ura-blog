import { ROW_TYPES, type Row as RowType } from '../../types'
import CarLane from '../car-lane'
import Forest from '../forest'
import TruckLane from '../track-lane'

type RowProps = {
  rowIndex: number
  row: RowType
  isDark: boolean
}

const Row = ({ rowIndex, row, isDark }: RowProps) => {
  switch (row.type) {
    case ROW_TYPES.FOREST:
      return <Forest rowIndex={rowIndex} row={row} isDark={isDark} />
    case ROW_TYPES.CAR:
      return <CarLane rowIndex={rowIndex} row={row} isDark={isDark} />
    case ROW_TYPES.TRUCK:
      return <TruckLane rowIndex={rowIndex} row={row} isDark={isDark} />
  }
}

export default Row
