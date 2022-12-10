import { Server } from 'socket.io'
import type { NextApiRequest } from 'next'
import { NextApiResponseWithSocket, PlayerValue, IGameRecord } from '../../src/types'

const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  // const sequelize = new Sequelize('sqlite::memory:');
  // const Game = sequelize.define('Game', {
  //   gameId: DataTypes.STRING,
  //   gameState: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
  //   turn: DataTypes.STRING
  // });
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', socket => {
      socket.on('game-state-change', async (msg) => {
        // const gameId = msg.gameId
        // const previousGame = await Game.findAll({
        //   where: {
        //     gameId: gameId
        //   }
        // })
        const updatedGame = {
          // gameId,
          gameState: msg.gameState,
          turn: (msg.turn === PlayerValue.X ? PlayerValue.O : PlayerValue.X)
        }
        // if(!previousGame) {
        //   Game.create(updatedGame)
        // } else {
        //   Game.update(updatedGame, {
        //     where: {
        //       gameId: gameId
        //     }
        //   })
        // }
        socket.broadcast.emit('update-game-state', updatedGame)
      })
    })
  }
  res.end()
}

export default SocketHandler;