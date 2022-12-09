import * as S from './styles'
import { PlayerValue, BoardItemValue } from '../../../types'
import { useRouter } from 'next/router'

interface InfoBannerProps {
  winner: BoardItemValue
  activePlayer: PlayerValue
}

export const InfoBanner: React.FC<InfoBannerProps> = ({ winner, activePlayer }) => {
  const router = useRouter()
  const { player, gameId } = router.query
  const isWinner = winner !== null

  return (
    <div>
      <S.WinnerBanner enabled={isWinner}>
        {isWinner && <>{winner} won!</>}
      </S.WinnerBanner>
      <p>Game ID: {gameId}</p>
      <p>You are: {player}</p>
      <p>Turn: {activePlayer}</p>
    </div>
  )
}
