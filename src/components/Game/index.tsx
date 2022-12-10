import { useState } from 'react'
import { useRouter } from 'next/router'
import * as S from './styles'
import { PlayerValue } from '../../types'

export const Game: React.FC = () => {
  const router = useRouter()
  const [gameId, setGameId] = useState<string>('')
  const [player, setPlayer] = useState<string>(PlayerValue.X)
  const handleJoinGame = () => {
    if(gameId !== '') {
      router.push(`/${gameId}?player=${player}`)
    }
  }

  return (
    <S.GameContainer>
      <input type='text' placeholder='Input game ID' value={gameId} onChange={(e) => setGameId(e.target.value)} />
      <div>
        <input type="radio" value={PlayerValue.X} checked={player === PlayerValue.X} onChange={(e) => setPlayer(e.target.value)}/> Player 1 (X)
        <input type="radio" value={PlayerValue.O} checked={player === PlayerValue.O} onChange={(e) => setPlayer(e.target.value)}/> Player 2 (O)
      </div>
      <button onClick={handleJoinGame}>Join game</button>
    </S.GameContainer>
  )
}
