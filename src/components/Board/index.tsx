import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
import * as S from './styles'
import { PlayerValue, BoardItemValue, GameState } from '../../types'
import { useInitialGameState } from '../../utils/hooks/useInitialGameState'
import { checkWinner } from '../../utils/checkWinner'

let socket: any
export const Board = () => {
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

    socket.on('update-game-state', (msg: GameState) => {
      setGameState(msg)
    })
  }

  const handlePlacement = (rowIndex: number, colIndex: number) => {
    if (!isWinner && gameState[rowIndex][colIndex] === null) {
      let newGameState = [...gameState]
      newGameState[rowIndex][colIndex] = activePlayer
      setGameState(newGameState)
      socket.emit('game-state-change', newGameState)
      activePlayer === PlayerValue.X ? setActivePlayer(PlayerValue.O) : setActivePlayer(PlayerValue.X)
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
