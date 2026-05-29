import { maxtileIndex, mintileIndex } from '../constants'
import useMapStore from '../stores/map'
import { type MoveDirection, ROW_TYPES } from '../types'

export const caulcateFinalPosition = (
  currentPosition: { rowIndex: number; tileIndex: number },
  moves: MoveDirection[]
) => {
  return moves.reduce((position, move) => {
    switch (move) {
      case 'forward':
        position.rowIndex += 1
        return position
      case 'backward':
        position.rowIndex -= 1
        return position
      case 'left':
        position.tileIndex -= 1
        return position
      case 'right':
        position.tileIndex += 1
        return position
      default:
        return position
    }
  }, currentPosition)
}

export const endsUpInValidPosition = (
  currentPosition: { rowIndex: number; tileIndex: number },
  moves: MoveDirection[]
) => {
  // Calculate the final position after applying the moves to the current position
  const finalPosition = caulcateFinalPosition(currentPosition, moves)

  // Detect it we hit the edge of the borard
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === mintileIndex - 1 ||
    finalPosition.tileIndex === maxtileIndex + 1
  ) {
    // Invalid move, ignore move command
    return false
  }

  // Detect if we hit a tree
  const finalRow = useMapStore.getState().rows[finalPosition.rowIndex - 1]
  if (
    finalRow &&
    finalRow.type === ROW_TYPES.FOREST &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    // Invalid move, ignore move command
    return false
  }

  return true
}
