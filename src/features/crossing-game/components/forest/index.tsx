import type { Row, ROW_TYPES } from '../../types'
import Grass from '../grass'
import Tree from './tree'

type ForestProps = {
  rowIndex: number
  row: Extract<Row, { type: typeof ROW_TYPES.FOREST }>
}

const Forest = ({ rowIndex, row }: ForestProps) => {
  return (
    <Grass rowIndex={rowIndex}>
      {row.trees.map((tree, index) => {
        const key = `tree-${index}`
        return <Tree key={key} tileIndex={tree.tileIndex} height={tree.height} />
      })}
    </Grass>
  )
}

export default Forest
