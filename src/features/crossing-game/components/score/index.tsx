import useGameStore from '../../stores/game'

const Score = () => {
  const store = useGameStore((state) => state.score)

  return <div className="absolute left-5 top-5 text-2xl text-white">{store}</div>
}

export default Score
