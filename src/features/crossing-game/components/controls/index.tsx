import { useEventListeners } from '../../hooks/use-event-listeners'
import { queueMove } from '../../stores/player'
import { MOVE_DIRECTIONS } from '../../types'
import './controls.css'

const Controls = () => {
  useEventListeners()

  return (
    <div id="controls">
      <div>
        <button type="button" onClick={() => queueMove(MOVE_DIRECTIONS.FORWARD)}>
          ▲
        </button>
        <button type="button" onClick={() => queueMove(MOVE_DIRECTIONS.LEFT)}>
          ◀
        </button>
        <button type="button" onClick={() => queueMove(MOVE_DIRECTIONS.BACKWARD)}>
          ▼
        </button>
        <button type="button" onClick={() => queueMove(MOVE_DIRECTIONS.RIGHT)}>
          ▶
        </button>
      </div>
    </div>
  )
}

export default Controls
