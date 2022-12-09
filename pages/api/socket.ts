import { Server, Socket } from 'socket.io'
import { Client } from 'pg';
import { getInitialGameState } from '../../src/utils/getInitialGameState';
import type { NextApiRequest } from 'next'
import { NextApiResponseWithSocket, PlayerValue } from '../../src/types'

const games: any = {}

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

      // socket.on('join', (gameId: string, username: string) => {
      //   socket.join(gameId)
      //   socket.gameId = gameId
      //   socket.username = username

      //   if(!games[gameId]) {
      //     games[gameId] = {
      //       state: getInitialGameState(),
      //       turn: 'X'
      //     }
      //   }
      //   // Send a message to all clients in the room
      //   io.in(gameId).emit('state', games[gameId].state, games[gameId].turn);
      // })

      // socket.on('move', (position) => {
      //   // Get the game state
      //   const game = games[socket.gameId as string];

      //   // Check if it's the client's turn
      //   if (game[socket.id] !== game.turn) {
      //     // Send an error message to the client
      //     socket.emit('error', 'It is not your turn');
      //   } else {
      //     // Update the game state
      //     const [row, col] = position;
      //     game.state[row][col] = game.turn;

      //     // Switch turns
      //     game.turn = (game.turn === 'X') ? 'O' : 'X';

      //     // Send a message to all clients in the room
      //     io.in(socket.gameId as string).emit('state', game.state, game.turn);
      //   }
      // });

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