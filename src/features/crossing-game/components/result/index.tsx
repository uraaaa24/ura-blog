import useGameStore from '../../stores/game'
import './result.css'

const Result = () => {
  const status = useGameStore((state) => state.status)
  const score = useGameStore((state) => state.score)
  const reset = useGameStore((state) => state.reset)

  if (status === 'running') return null

  return (
    <div id="result-container">
      <div id="result">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <button type="button" onClick={reset}>
          Play Again
        </button>
      </div>
    </div>
  )
}

export default Result
