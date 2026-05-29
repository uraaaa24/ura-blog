import type * as THREE from 'three'
import { MOVE_DIRECTIONS, type MoveDirection } from '../types'
import { endsUpInValidPosition } from '../utils'
import useGameStore from './game'
import useMapStore from './map'

export const state: {
  currentRow: number
  currentTile: number
  movesQueue: MoveDirection[]
  ref: THREE.Object3D | null
} = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
  ref: null
}

export const queueMove = (direction: MoveDirection) => {
  // ゲームオーバー時は移動を受け付けない
  if (useGameStore.getState().status === 'gameover') return

  const isValidMove = endsUpInValidPosition(
    { rowIndex: state.currentRow, tileIndex: state.currentTile },
    [...state.movesQueue, direction]
  )
  if (!isValidMove) return

  state.movesQueue.push(direction)
}

export const stepCompleted = () => {
  const direction = state.movesQueue.shift()

  switch (direction) {
    case MOVE_DIRECTIONS.FORWARD:
      state.currentRow += 1
      break
    case MOVE_DIRECTIONS.BACKWARD:
      state.currentRow -= 1
      break
    case MOVE_DIRECTIONS.LEFT:
      state.currentTile -= 1
      break
    case MOVE_DIRECTIONS.RIGHT:
      state.currentTile += 1
      break
  }

  if (state.currentRow === useMapStore.getState().rows.length - 10) {
    useMapStore.getState().addRows()
  }

  useGameStore.getState().updateScore(state.currentRow)
}

export const setPlayerRef = (ref: THREE.Object3D) => {
  state.ref = ref
}

export function resetPlayerStore() {
  state.currentRow = 0
  state.currentTile = 0
  state.movesQueue = []

  if (!state.ref) return
  state.ref.position.x = 0
  state.ref.position.y = 0
  state.ref.children[0].rotation.z = 0
}
