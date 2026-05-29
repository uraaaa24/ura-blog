'use client'

import Controls from '@/features/crossing-game/components/controls'
import GameMap from '@/features/crossing-game/components/map'
import Player from '@/features/crossing-game/components/player'
import Result from '@/features/crossing-game/components/result'
import Scene from '@/features/crossing-game/components/scene'
import Score from '@/features/crossing-game/components/score'
import './game.css'

const CrossingGamePage = () => {
  return (
    <div className="relative left-1/2 right-1/2 -mt-32 -mx-[50vw] flex h-screen w-screen items-center">
      <div className="mx-auto h-full w-full max-h-10/12 max-w-10/12 overflow-hidden border-2 border-gray-300">
        <div className="game">
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
