import useMapStore from '../../stores/map'
import Grass from '../grass'
import Row from '../row'

const GameMap = () => {
  const rows = useMapStore((state) => state.rows)

  return (
    <>
      <Grass rowIndex={0} />
      <Grass rowIndex={-1} />
      <Grass rowIndex={-2} />
      <Grass rowIndex={-3} />
      <Grass rowIndex={-4} />
      <Grass rowIndex={-5} />
      <Grass rowIndex={-6} />
      <Grass rowIndex={-7} />
      <Grass rowIndex={-8} />
      <Grass rowIndex={-9} />
      <Grass rowIndex={-10} />

      {rows.map((row, index) => {
        const key = `row-${index}`
        return <Row key={key} rowIndex={index + 1} row={row} />
      })}
    </>
  )
}

export default GameMap
