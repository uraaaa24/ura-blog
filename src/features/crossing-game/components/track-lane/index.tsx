import type { Row, ROW_TYPES } from '../../types'
import Road from '../road'
import Truck from './truck'

type TrackLaneProps = {
  rowIndex: number
  row: Extract<Row, { type: typeof ROW_TYPES.TRUCK }>
  isDark: boolean
}

const TruckLane = ({ rowIndex, row, isDark }: TrackLaneProps) => {
  return (
    <Road rowIndex={rowIndex} isDark={isDark}>
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
