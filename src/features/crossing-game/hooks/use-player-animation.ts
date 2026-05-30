import { useFrame } from '@react-three/fiber'
import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { tileSize } from '../constants'
import { state, stepCompleted } from '../stores/player'
import { MOVE_DIRECTIONS } from '../types'

const getEndPosition = (direction: string, startX: number, startY: number) => {
  switch (direction) {
    case MOVE_DIRECTIONS.FORWARD:
      return { endX: startX, endY: startY + tileSize }
    case MOVE_DIRECTIONS.BACKWARD:
      return { endX: startX, endY: startY - tileSize }
    case MOVE_DIRECTIONS.LEFT:
      return { endX: startX - tileSize, endY: startY }
    case MOVE_DIRECTIONS.RIGHT:
      return { endX: startX + tileSize, endY: startY }
    default:
      return { endX: startX, endY: startY }
  }
}

const setPosition = (player: THREE.Group, progress: number) => {
  const startX = state.currentTile * tileSize
  const startY = state.currentRow * tileSize
  const { endX, endY } = getEndPosition(state.movesQueue[0], startX, startY)

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress)
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress)
  player.position.z = Math.sin(progress * Math.PI) * 8
  player.children[0].position.z = 10 + Math.sin(progress * Math.PI) * 8
}

const getEndRotation = (direction: string) => {
  switch (direction) {
    case MOVE_DIRECTIONS.FORWARD:
      return 0
    case MOVE_DIRECTIONS.BACKWARD:
      return Math.PI
    case MOVE_DIRECTIONS.LEFT:
      return Math.PI / 2
    case MOVE_DIRECTIONS.RIGHT:
      return -Math.PI / 2
    default:
      return 0
  }
}

const setRotation = (player: THREE.Group, progress: number) => {
  const endRotation = getEndRotation(state.movesQueue[0])

  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  )
}

export const usePlayerAnimation = (ref: RefObject<THREE.Group | null>) => {
  const moveStartTime = useRef<number | null>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    if (!state.movesQueue.length) return
    const player = ref.current

    // 移動開始時刻を記録
    if (moveStartTime.current === null) {
      moveStartTime.current = 0
    }

    moveStartTime.current += delta

    // Seconds it takes to take a step
    const stepTime = 0.2
    const progress = Math.min(1, moveStartTime.current / stepTime)

    setPosition(player, progress)
    setRotation(player, progress)

    if (progress >= 1) {
      stepCompleted()
      moveStartTime.current = null
    }
  })
}
