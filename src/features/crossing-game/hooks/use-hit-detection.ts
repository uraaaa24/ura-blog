import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import * as THREE from 'three'
import useGameStore from '../stores/game'
import { state as player } from '../stores/player'

export const useHitDetection = (vehicle: RefObject<THREE.Group | null>, rowIndex: number) => {
  const endGame = useGameStore((state) => state.endGame)

  useFrame(() => {
    if (!vehicle.current) return
    if (!player.ref) return

    if (
      rowIndex === player.currentRow ||
      rowIndex === player.currentRow + 1 ||
      rowIndex === player.currentRow - 1
    ) {
      const vehicleBoundingBox = new THREE.Box3()
      vehicleBoundingBox.setFromObject(vehicle.current)

      const playerBoundingBox = new THREE.Box3()
      playerBoundingBox.setFromObject(player.ref)

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        endGame()
      }
    }
  })
}
