import { useEffect } from 'react'
import { queueMove } from '../stores/player'
import { MOVE_DIRECTIONS } from '../types'

export const useEventListeners = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          queueMove(MOVE_DIRECTIONS.FORWARD)
          break
        case 'ArrowDown':
          e.preventDefault()
          queueMove(MOVE_DIRECTIONS.BACKWARD)
          break
        case 'ArrowLeft':
          e.preventDefault()
          queueMove(MOVE_DIRECTIONS.LEFT)
          break
        case 'ArrowRight':
          e.preventDefault()
          queueMove(MOVE_DIRECTIONS.RIGHT)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}
