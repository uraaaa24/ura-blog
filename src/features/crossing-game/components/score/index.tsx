import useGameStore from '../../stores/game'

const Score = () => {
  const store = useGameStore((state) => state.score)

  return <div className="absolute top-5 left-5 text-2xl text-white">{store}</div>
}

export default Score
