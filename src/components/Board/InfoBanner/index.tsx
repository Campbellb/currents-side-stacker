import { useRouter } from 'next/router'
import * as S from './styles'
import { PlayerValue, BoardItemValue } from '../../../types'

interface InfoBannerProps {
  winner: BoardItemValue
  activePlayer: PlayerValue
}

export const InfoBanner: React.FC<InfoBannerProps> = ({ winner, activePlayer }) => {
  const router = useRouter()
  const { player, gameId } = router.query
  const isWinner = winner !== null
  const yourTurn = player === activePlayer
  const winnerString = winner === player ? `Player "${player}" won!` : `Player "${player}" lost!`

  return (
    <S.InfoBanner>
      {isWinner && <>{winnerString}</>}
      {!isWinner && (yourTurn ? <>{player}, it&apos;s your turn!</> : <>{player}, it&apos;s NOT your turn!</>)}
    </S.InfoBanner>
  )
}
