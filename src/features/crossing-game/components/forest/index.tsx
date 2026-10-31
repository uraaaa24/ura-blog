import type { Row, ROW_TYPES } from '../../types'
import Grass from '../grass'
import Tree from './tree'

type ForestProps = {
  rowIndex: number
  row: Extract<Row, { type: typeof ROW_TYPES.FOREST }>
  isDark: boolean
}

const Forest = ({ rowIndex, row, isDark }: ForestProps) => {
  return (
    <Grass rowIndex={rowIndex} isDark={isDark}>
      {row.trees.map((tree) => {
        return (
          <Tree
            key={tree.tileIndex}
            tileIndex={tree.tileIndex}
            height={tree.height}
            isDark={isDark}
          />
        )
      })}
    </Grass>
  )
}

export default Forest
