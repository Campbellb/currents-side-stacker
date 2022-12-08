import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('game-state-change', msg => {
        socket.broadcast.emit('update-game-state', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler;