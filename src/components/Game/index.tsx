import { Dispatch, SetStateAction } from 'react'
import * as S from './styles'
import { PlayerValue } from '../../types'
import { useRouter } from 'next/router'

interface GameProps {
  setGameStarted: Dispatch<SetStateAction<boolean>>,
  player: PlayerValue,
  setPlayer: Dispatch<SetStateAction<PlayerValue>>
}

export const Game: React.FC<GameProps> = ({ setGameStarted, player, setPlayer }) => {
  const router = useRouter()
  const handleNewGame = () => {
    setGameStarted(true)
    router.push(`/?player=${player}`)
  }
  return (
    <S.GameContainer>
      <div>
        <input type="radio" value={PlayerValue.X} checked={player === PlayerValue.X} onChange={(e) => setPlayer(e.target.value as PlayerValue)}/> Player 1 (X)
        <input type="radio" value={PlayerValue.O} checked={player === PlayerValue.O} onChange={(e) => setPlayer(e.target.value as PlayerValue)}/> Player 2 (O)
      </div>
      <button onClick={handleNewGame}>Join game</button>
    </S.GameContainer>
  )
}
