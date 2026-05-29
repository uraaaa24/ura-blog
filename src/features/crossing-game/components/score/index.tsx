import useGameStore from '../../stores/game'

const Score = () => {
  const store = useGameStore((state) => state.score)

  return <div id="score">{store}</div>
}

export default Score
