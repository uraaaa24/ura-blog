import { ROW_TYPES, type Row as RowType } from '../../types'
import CarLane from '../car-lane'
import Forest from '../forest'
import TruckLane from '../track-lane'

type RowProps = {
  rowIndex: number
  row: RowType
}

const Row = ({ rowIndex, row }: RowProps) => {
  switch (row.type) {
    case ROW_TYPES.FOREST:
      return <Forest rowIndex={rowIndex} row={row} />
    case ROW_TYPES.CAR:
      return <CarLane rowIndex={rowIndex} row={row} />
    case ROW_TYPES.TRUCK:
      return <TruckLane rowIndex={rowIndex} row={row} />
  }
}

export default Row
