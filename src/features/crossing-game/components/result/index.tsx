import useGameStore from '../../stores/game'

const Result = () => {
  const status = useGameStore((state) => state.status)
  const score = useGameStore((state) => state.score)
  const reset = useGameStore((state) => state.reset)

  if (status === 'running') return null

  return (
    <div className="absolute top-0 flex min-h-full min-w-full items-center justify-center">
      <div className="flex flex-col items-center bg-white p-5">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer bg-red-500 px-12 py-5 font-inherit text-inherit"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default Result
