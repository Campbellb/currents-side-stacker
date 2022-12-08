import { useEffect, useState } from 'react'
import * as S from './styles'
import { PlayerValue, BoardItemValue } from '../../types'
import { useInitialGameState } from '../../utils/hooks/useInitialGameState'
import { checkWinner } from '../../utils/checkWinner'

export const Board = () => {
  const initialGameState = useInitialGameState()
  const [gameState, setGameState] = useState(initialGameState)
  const [activePlayer, setActivePlayer] = useState<PlayerValue>('X')
  const [gameOver, setGameOver] = useState<boolean>(false)

  useEffect(() => {
    const isWinner = checkWinner(gameState)
    const boardFull = !gameState.some((row: any) => row.includes(null));
    (isWinner === true || boardFull) && setGameOver(true)
  }, [gameState])


  const handlePlacement = (rowIndex: number, colIndex: number) => {
    if (!gameOver && gameState[rowIndex][colIndex] === null) {
      let newGameState = [...gameState]
      newGameState[rowIndex][colIndex] = activePlayer
      setGameState(newGameState)
      activePlayer === 'X' ? setActivePlayer('O') : setActivePlayer('X')
    }
  }

  const getPlacementIndex = (row: BoardItemValue[], reverse?: boolean) => {
    return reverse ? row.lastIndexOf(null) : row.indexOf(null)
  }

  return (
    <div>
      {gameState.map((row: BoardItemValue[], rowIndex: number) =>
        <S.BoardRow key={`row${rowIndex}`}>
          <button onClick={() => handlePlacement(rowIndex, getPlacementIndex(row))}>+</button>
          {row.map((item: BoardItemValue, colIndex) =>
            <S.BoardItem
              key={`i${rowIndex}${colIndex}`}
            >
              {item}
            </S.BoardItem>
          )}
          <button onClick={() => handlePlacement(rowIndex, getPlacementIndex(row, true))}>+</button>
        </S.BoardRow>
      )}
    </div>
  )
}
