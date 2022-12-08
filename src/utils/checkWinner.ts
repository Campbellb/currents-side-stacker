import { BoardItemValue, PlayerValue } from "../types";

const WINNING_NUMBER = 4

const checkHorizontal = (gameState: BoardItemValue[][], player: PlayerValue) => {
  for (let i = 0; i < gameState.length; i++) {
    let count = 0;
    for (let j = 0; j < gameState[i].length; j++) {
      if (gameState[i][j] === player) {
        count++;
        if (count === WINNING_NUMBER) {
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

const checkDiagonal1 = (gameState: BoardItemValue[][], player: PlayerValue) => {
  return false;
}

const checkDiagonal2 = (gameState: BoardItemValue[][], player: PlayerValue) => {
  return false;
}

export const checkWinner = (gameState: BoardItemValue[][]) => {
  const isXWinner = checkVertical(gameState, PlayerValue.X)
    || checkHorizontal(gameState, PlayerValue.X)
    || checkDiagonal1(gameState, PlayerValue.X)
    || checkDiagonal2(gameState, PlayerValue.X)

  const isOWinner = checkVertical(gameState, PlayerValue.O)
    || checkHorizontal(gameState, PlayerValue.O)
    || checkDiagonal1(gameState, PlayerValue.O)
    || checkDiagonal2(gameState, PlayerValue.O);

  if (isXWinner) return PlayerValue.X
  if (isOWinner) return PlayerValue.O
  return null

}