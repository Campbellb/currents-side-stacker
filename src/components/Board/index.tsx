import { useEffect, useState } from 'react'
import * as S from './styles'
import { PlayerValue, BoardItemValue } from '../../types'
import { useInitialGameState } from '../../utils/hooks/useInitialGameState'
import { checkWinner } from '../../utils/checkWinner'

export const Board = () => {
  const initialGameState = useInitialGameState()
  const [gameState, setGameState] = useState<BoardItemValue[][]>(initialGameState)
  const [activePlayer, setActivePlayer] = useState<PlayerValue>(PlayerValue.X)
  const [gameOver, setGameOver] = useState<boolean>(false)

  useEffect(() => {
    const isWinner = checkWinner(gameState)
    const boardFull = !gameState.some((row: BoardItemValue[]) => row.includes(null));
    (isWinner !== null || boardFull) && setGameOver(true)
  }, [gameState])

  const handlePlacement = (rowIndex: number, colIndex: number) => {
    if (!gameOver && gameState[rowIndex][colIndex] === null) {
      let newGameState = [...gameState]
      newGameState[rowIndex][colIndex] = activePlayer
      setGameState(newGameState)
      activePlayer === PlayerValue.X ? setActivePlayer(PlayerValue.O) : setActivePlayer(PlayerValue.X)
    }
  }

  return (
    <div>
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
