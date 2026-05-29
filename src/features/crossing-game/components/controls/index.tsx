import { Triangle } from 'lucide-react'
import { useEventListeners } from '../../hooks/use-event-listeners'
import { queueMove } from '../../stores/player'
import { MOVE_DIRECTIONS } from '../../types'

const Controls = () => {
  useEventListeners()

  const buttonClass =
    'h-10 w-full cursor-pointer border border-gray-300 bg-white shadow-[3px_5px_0px_0px_rgba(0,0,0,0.75)] outline-none flex items-center justify-center'

  return (
    <div className="absolute bottom-5 flex min-w-full items-end justify-center">
      <div className="grid gap-2.5" style={{ gridTemplateColumns: '50px 50px 50px' }}>
        <button
          type="button"
          onClick={() => queueMove(MOVE_DIRECTIONS.FORWARD)}
          style={{ gridColumn: '1 / -1' }}
          className={buttonClass}
        >
          <Triangle size={20} fill="currentColor" className="rotate-0" />
        </button>
        <button
          type="button"
          onClick={() => queueMove(MOVE_DIRECTIONS.LEFT)}
          className={buttonClass}
        >
          <Triangle size={20} fill="currentColor" className="-rotate-90" />
        </button>
        <button
          type="button"
          onClick={() => queueMove(MOVE_DIRECTIONS.BACKWARD)}
          className={buttonClass}
        >
          <Triangle size={20} fill="currentColor" className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => queueMove(MOVE_DIRECTIONS.RIGHT)}
          className={buttonClass}
        >
          <Triangle size={20} fill="currentColor" className="rotate-90" />
        </button>
      </div>
    </div>
  )
}

export default Controls
