import type * as THREE from 'three'

export const ROW_TYPES = {
  FOREST: 'forest',
  CAR: 'car',
  TRUCK: 'truck'
} as const
export type RowType = (typeof ROW_TYPES)[keyof typeof ROW_TYPES]

export type Row =
  | {
      id: number
      type: typeof ROW_TYPES.FOREST
      trees: {
        tileIndex: number
        height: number
      }[]
    }
  | {
      id: number
      type: typeof ROW_TYPES.CAR
      direction: boolean
      speed: number
      vehicles: {
        initialtileIndex: number
        color: THREE.ColorRepresentation
      }[]
    }
  | {
      id: number
      type: typeof ROW_TYPES.TRUCK
      direction: boolean
      speed: number
      vehicles: {
        initialtileIndex: number
        color: THREE.ColorRepresentation
      }[]
    }

export const MOVE_DIRECTIONS = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
  LEFT: 'left',
  RIGHT: 'right'
} as const
export type MoveDirection = (typeof MOVE_DIRECTIONS)[keyof typeof MOVE_DIRECTIONS]
