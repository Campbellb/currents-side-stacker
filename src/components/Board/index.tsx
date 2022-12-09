import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import * as S from './styles'
import { PlayerValue, BoardItemValue, GameState } from '../../types'
import { useInitialGameState } from '../../utils/hooks/useInitialGameState'
import { checkWinner } from '../../utils/checkWinner'
import { useRouter } from 'next/router'
import { InfoBanner } from './InfoBanner'

interface MsgProps {
  gameId: string,
  gameState: GameState,
  turn: PlayerValue
}

let socket: Socket

export const Board: React.FC = () => {
  const router = useRouter()
  const { player, gameId } = router.query
  const initialGameState = useInitialGameState()
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [activePlayer, setActivePlayer] = useState<PlayerValue>(PlayerValue.X)
  const [winner, setWinner] = useState<BoardItemValue>(null)
  const isMyTurn = activePlayer === player

  useEffect(() => {
    socketInitializer()
  }, [])

  useEffect(() => {
    const winningPlayer = checkWinner(gameState)
    const boardFull = !gameState.some((row: BoardItemValue[]) => row.includes(null));
    if (winningPlayer !== null || boardFull) {
      setWinner(winningPlayer)
    }
  }, [gameState])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('socket connected')
    })

    socket.on('update-game-state', (msg: MsgProps) => {
      setGameState(msg.gameState)
      setActivePlayer(msg.turn)
    })
  }

  const handlePlacement = (rowIndex: number, colIndex: number) => {
    if (isMyTurn && winner === null && gameState[rowIndex][colIndex] === null) {
      let newGameState = [...gameState]
      newGameState[rowIndex][colIndex] = activePlayer
      setGameState(newGameState)
      socket.emit('game-state-change', {gameId, gameState: newGameState, turn: activePlayer})
    }
  }

  return (
    <div>
      <InfoBanner winner={winner} activePlayer={activePlayer} />
      {gameState.map((row: BoardItemValue[], rowIndex: number) =>
        <S.BoardRow key={`row${rowIndex}`}>
          <button onClick={() => handlePlacement(rowIndex, row.indexOf(null))}>+</button>
          {row.map((item: BoardItemValue, colIndex) =>
            <S.BoardItem
              key={`i${rowIndex}${colIndex}`}
            >
              {item}
            </S.BoardItem>
          )}
          <button onClick={() => handlePlacement(rowIndex, row.lastIndexOf(null))}>+</button>
        </S.BoardRow>
      )}
    </div>
  )
}
