import { useFrame } from '@react-three/fiber'
import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { tileSize } from '../constants'
import { state, stepCompleted } from '../stores/player'
import { MOVE_DIRECTIONS } from '../types'

const setPosition = (player: THREE.Group, progress: number) => {
  const startX = state.currentTile * tileSize
  const startY = state.currentRow * tileSize

  let endX = startX
  let endY = startY

  switch (state.movesQueue[0]) {
    case MOVE_DIRECTIONS.FORWARD:
      endY += tileSize
      break
    case MOVE_DIRECTIONS.BACKWARD:
      endY -= tileSize
      break
    case MOVE_DIRECTIONS.LEFT:
      endX -= tileSize
      break
    case MOVE_DIRECTIONS.RIGHT:
      endX += tileSize
      break
  }

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress)
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress)
  player.position.z = Math.sin(progress * Math.PI) * 8
  player.children[0].position.z = 10 + Math.sin(progress * Math.PI) * 8
}

const setRotation = (player: THREE.Group, progress: number) => {
  let endRotation = 0

  switch (state.movesQueue[0]) {
    case MOVE_DIRECTIONS.FORWARD:
      endRotation = 0
      break
    case MOVE_DIRECTIONS.BACKWARD:
      endRotation = Math.PI
      break
    case MOVE_DIRECTIONS.LEFT:
      endRotation = Math.PI / 2
      break
    case MOVE_DIRECTIONS.RIGHT:
      endRotation = -Math.PI / 2
      break
  }

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
