import { create } from 'zustand'
import useMapStore from './map'
import { resetPlayerStore } from './player'

type StoreState = {
  status: 'running' | 'gameover'
  score: number
  updateScore: (newScore: number) => void
  endGame: () => void
  reset: () => void
}

const useGameStore = create<StoreState>((set) => ({
  status: 'running',
  score: 0,
  updateScore: (rowIndex: number) => {
    set((state) => ({ score: Math.max(rowIndex, state.score) }))
  },
  endGame: () => {
    set({ status: 'gameover' })
  },
  reset: () => {
    useMapStore.getState().reset()
    resetPlayerStore()
    set({ status: 'running', score: 0 })
  }
}))

export default useGameStore
