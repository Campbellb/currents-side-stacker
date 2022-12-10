import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { useRouter } from 'next/router'
import * as S from './styles'
import { InfoBanner } from './InfoBanner'
import { useInitialGameState } from '../../utils/useInitialGameState'
import { checkWinner } from '../../utils/checkWinner'
import { PlayerValue, BoardItemValue, GameState } from '../../types'

interface MsgProps {
  gameState: GameState,
  turn: PlayerValue
}

let socket: Socket

export const Board: React.FC<any> = () => {
  const router = useRouter()
  const { player } = router.query
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
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('socket connected')
    })

    socket.on('update-game-state', (msg: MsgProps) => {
      setActivePlayer(msg.turn)
      setGameState(msg.gameState)
    })
  }

  const handlePlacement = (rowIndex: number, colIndex: number) => {
    if (isMyTurn && winner === null && gameState[rowIndex][colIndex] === null) {
      let newGameState = [...gameState]
      newGameState[rowIndex][colIndex] = activePlayer
      setGameState(newGameState)
      socket.emit('game-state-change', {gameState: newGameState, turn: activePlayer})
    }
  }

  return (
    <div>
      <InfoBanner winner={winner} activePlayer={activePlayer} />
      <S.BoardContainer>
      {gameState.map((row: BoardItemValue[], rowIndex: number) =>
        <S.BoardRow key={`row${rowIndex}`}>
          <S.MoveButton onClick={() => handlePlacement(rowIndex, row.indexOf(null))}>+</S.MoveButton>
          {row.map((item: BoardItemValue, colIndex) =>
            <S.BoardItem
            key={`i${rowIndex}${colIndex}`}
            >
              {item}
            </S.BoardItem>
          )}
          <S.MoveButton onClick={() => handlePlacement(rowIndex, row.lastIndexOf(null))}>+</S.MoveButton>
        </S.BoardRow>
      )}
      </S.BoardContainer>
    </div>
  )
}
