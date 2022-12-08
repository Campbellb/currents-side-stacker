export enum PlayerValue {
  X = 'X',
  O = 'O'
}

export type BoardItemValue = 'X' | 'O' | null

export type GameState = BoardItemValue[][]