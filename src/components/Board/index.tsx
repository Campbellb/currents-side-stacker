import { useEffect, useState } from 'react'
import * as S from './styles'
import { PlayerValue, BoardItemValue } from '../../types'
import { useInitialGameState } from '../../utils/hooks/useInitialGameState'
import { checkWinner } from '../../utils/checkWinner'

export const Board = () => {
  const initialGameState = useInitialGameState()
  const [gameState, setGameState] = useState<BoardItemValue[][]>(initialGameState)
  const [activePlayer, setActivePlayer] = useState<PlayerValue>(PlayerValue.X)
  const [winner, setWinner] = useState<BoardItemValue>(null)
  const isWinner = winner !== null

  useEffect(() => {
    const winningPlayer = checkWinner(gameState)
    const boardFull = !gameState.some((row: BoardItemValue[]) => row.includes(null));
    if (winningPlayer !== null || boardFull) {
      setWinner(winningPlayer)
    }
  }, [gameState])

  const handlePlacement = (rowIndex: number, colIndex: number) => {
    if (!isWinner && gameState[rowIndex][colIndex] === null) {
      let newGameState = [...gameState]
      newGameState[rowIndex][colIndex] = activePlayer
      setGameState(newGameState)
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
