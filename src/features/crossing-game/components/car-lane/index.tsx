import type { Row, ROW_TYPES } from '../../types'
import Road from '../road'
import Car from './car'

type CarLaneProps = {
  rowIndex: number
  row: Extract<Row, { type: typeof ROW_TYPES.CAR }>
}

const CarLane = ({ rowIndex, row }: CarLaneProps) => {
  return (
    <Road rowIndex={rowIndex}>
      {row.vehicles.map((vehicle, index) => {
        const key = `vehicle-${index}`
        return (
          <Car
            key={key}
            rowIndex={rowIndex}
            initialtileIndex={vehicle.initialtileIndex}
            direction={row.direction}
            speed={row.speed}
            color={vehicle.color}
          />
        )
      })}
    </Road>
  )
}

export default CarLane
