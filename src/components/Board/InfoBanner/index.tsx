import * as S from './styles'
import { PlayerValue, BoardItemValue } from '../../../types'
import { useRouter } from 'next/router'
import { CopyIcon } from '../../icons/Copy'

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(gameId as string)
  }

  return (
    <div>
      <S.InfoSection>
        Game ID: {gameId}
        <S.CopyButton>
          <S.IconContainer onClick={handleCopy}>
            <CopyIcon />
          </S.IconContainer>
        </S.CopyButton>
      </S.InfoSection>
      <S.WinnerBanner>
        {isWinner && <>{winnerString}</>}
        {!isWinner && (yourTurn ? <>{player}, it&apos;s your turn!</> : <>{player}, it&apos;s NOT your turn!</>)}
      </S.WinnerBanner>
    </div>
  )
}
