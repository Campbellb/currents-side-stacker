import { Server, Socket } from 'socket.io'
import { Client } from 'pg';
import type { NextApiRequest } from 'next'
import { NextApiResponseWithSocket, PlayerValue, IGameRecord } from '../../src/types'

const games: IGameRecord = {}

interface ISocket extends Socket {
  gameId?: string
  username?: string
}

const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('game-state-change', msg => {
        const gameId = msg.gameId
        const updatedGame = !games[gameId] ? {
          gameId,
          gameState: msg.gameState,
          turn: PlayerValue.X
        } : {
          gameId,
          gameState: msg.gameState,
          turn: (msg.turn === PlayerValue.X ? PlayerValue.O : PlayerValue.X)
        }
        games[gameId] = updatedGame
        socket.broadcast.emit('update-game-state', updatedGame)
      })
    })
  }
  res.end()
}

export default SocketHandler;