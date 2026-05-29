import type { Row, ROW_TYPES } from '../../types'
import Road from '../road'
import Truck from './truck'

type TrackLaneProps = {
  rowIndex: number
  row: Extract<Row, { type: typeof ROW_TYPES.TRUCK }>
}

const TruckLane = ({ rowIndex, row }: TrackLaneProps) => {
  return (
    <Road rowIndex={rowIndex}>
      {row.vehicles.map((vehicle, index) => {
        const key = `vehicle-${index}`
        return (
          <Truck
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

export default TruckLane
