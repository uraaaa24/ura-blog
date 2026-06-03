'use client'

import Controls from '@/features/crossing-game/components/controls'
import GameMap from '@/features/crossing-game/components/map'
import Player from '@/features/crossing-game/components/player'
import Result from '@/features/crossing-game/components/result'
import Scene from '@/features/crossing-game/components/scene'
import Score from '@/features/crossing-game/components/score'
import { Press_Start_2P } from 'next/font/google'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin']
})

const CrossingGamePage = () => {
  return (
    <div className="relative left-1/2 flex min-h-0 w-dvw max-w-6xl flex-1 -translate-x-1/2 justify-center px-4">
      <div className="min-h-0 w-full flex-1 overflow-hidden border border-gray-300 rounded-lg">
        <div className={`relative h-full w-full ${pressStart2P.className}`}>
          <Scene>
            <Player />
            <GameMap />
          </Scene>
          <Score />
          <Controls />
          <Result />
        </div>
      </div>
    </div>
  )
}

export default CrossingGamePage
