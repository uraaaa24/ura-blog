import useMapStore from '../../stores/map'
import Grass from '../grass'
import Row from '../row'

type GameMapProps = {
  isDark: boolean
}

const GameMap = ({ isDark }: GameMapProps) => {
  const rows = useMapStore((state) => state.rows)

  return (
    <>
      <Grass rowIndex={0} isDark={isDark} />
      <Grass rowIndex={-1} isDark={isDark} />
      <Grass rowIndex={-2} isDark={isDark} />
      <Grass rowIndex={-3} isDark={isDark} />
      <Grass rowIndex={-4} isDark={isDark} />
      <Grass rowIndex={-5} isDark={isDark} />
      <Grass rowIndex={-6} isDark={isDark} />
      <Grass rowIndex={-7} isDark={isDark} />
      <Grass rowIndex={-8} isDark={isDark} />
      <Grass rowIndex={-9} isDark={isDark} />
      <Grass rowIndex={-10} isDark={isDark} />

      {rows.map((row, index) => {
        const key = `row-${index}`
        return <Row key={key} rowIndex={index + 1} row={row} isDark={isDark} />
      })}
    </>
  )
}

export default GameMap
