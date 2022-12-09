import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}
interface SocketWithIO extends NetSocket {
  server: SocketServer
}
export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export enum PlayerValue {
  X = 'X',
  O = 'O'
}

export type BoardItemValue = 'X' | 'O' | null

export type GameState = BoardItemValue[][]


export type GameRecord = {
  gameId: string,
  turn: PlayerValue,
  gameState: GameState
}
export interface IGameRecord {
  [key: string]: GameRecord
}