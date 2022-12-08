import { useRouter } from "next/router"
import { Board } from "../src/components/Board"

const GameId = () => {
  const router = useRouter()
  const { gameId } = router.query

  return (
    <div>
      {gameId}
      <Board gameId={gameId as string} />
    </div>
  )
}

export default GameId;