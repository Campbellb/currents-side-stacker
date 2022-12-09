import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import * as S from './styles'
import { PlayerValue, BoardItemValue, GameState } from '../../types'
import { useInitialGameState } from '../../utils/hooks/useInitialGameState'
import { checkWinner } from '../../utils/checkWinner'

interface BoardProps {
  gameId?: string
}

interface MsgProps {
  gameId: string,
  gameState: GameState,
  turn: PlayerValue
}

let socket: any

export const Board: React.FC<BoardProps> = ({ gameId }) => {
  const initialGameState = useInitialGameState()
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [activePlayer, setActivePlayer] = useState<PlayerValue>(PlayerValue.X)
  const [winner, setWinner] = useState<BoardItemValue>(null)
  const isWinner = winner !== null

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
      if(msg.gameId === gameId) {
        setGameState(msg.gameState)
        setActivePlayer(msg.turn)
      }
    })
  }

  const handlePlacement = (rowIndex: number, colIndex: number) => {
    if (!isWinner && gameState[rowIndex][colIndex] === null) {
      let newGameState = [...gameState]
      newGameState[rowIndex][colIndex] = activePlayer
      setGameState(newGameState)
      socket.emit('game-state-change', {gameId, gameState: newGameState, turn: activePlayer})
    }
  }

  return (
    <div>
      <S.WinnerBanner enabled={isWinner}>
        {isWinner && <>{winner} won!</>}
      </S.WinnerBanner>
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
