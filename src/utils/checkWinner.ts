import { BoardItemValue, PlayerValue } from "../types";

const checkHorizontal = (gameState: BoardItemValue[][], player: PlayerValue) => {
  for (let i = 0; i < gameState.length; i++) {
    let count = 0;
    for (let j = 0; j < gameState[i].length; j++) {
      if (gameState[i][j] === player) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }
  return false;
}

const checkVertical = (gameState: BoardItemValue[][], player: PlayerValue) => {
  const transposedArray = gameState[0].map((_, colIndex) => gameState.map(row => row[colIndex]));
  return checkHorizontal(transposedArray, player)
}

const checkDiagonal = (gameState: BoardItemValue[][], player: PlayerValue) => {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (gameState[i][j] === player &&
        (
          (i >= 3 && j >= 3 && gameState[i][j] === gameState[i - 1][j - 1] && gameState[i][j] === gameState[i - 2][j - 2] && gameState[i][j] === gameState[i - 3][j - 3]) ||
          (i >= 3 && j <= gameState[i].length - 4 && gameState[i][j] === gameState[i - 1][j + 1] && gameState[i][j] === gameState[i - 2][j + 2] && gameState[i][j] === gameState[i - 3][j + 3]) ||
          (i <= gameState.length - 4 && j >= 3 && gameState[i][j] === gameState[i + 1][j - 1] && gameState[i][j] === gameState[i + 2][j - 2] && gameState[i][j] === gameState[i + 3][j - 3]) ||
          (i <= gameState.length - 4 && j <= gameState[i].length - 4 && gameState[i][j] === gameState[i + 1][j + 1] && gameState[i][j] === gameState[i + 2][j + 2] && gameState[i][j] === gameState[i + 3][j + 3])
        )
      ) {
        return true
      }
    }
  }

  return false
}

export const checkWinner = (gameState: BoardItemValue[][]) => {
  const isXWinner = checkVertical(gameState, PlayerValue.X)
    || checkHorizontal(gameState, PlayerValue.X)
    || checkDiagonal(gameState, PlayerValue.X)

  const isOWinner = checkVertical(gameState, PlayerValue.O)
    || checkHorizontal(gameState, PlayerValue.O)
    || checkDiagonal(gameState, PlayerValue.O)

  if (isXWinner) return PlayerValue.X
  if (isOWinner) return PlayerValue.O
  return null

}