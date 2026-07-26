import { createServer } from 'http'
import { Server } from 'socket.io'
import { SOCKET_PORT, CLIENT_URL } from './config'
import { socketAuthMiddleware } from './socket/middleware/auth'
import { registerMessageHandlers } from './socket/handlers/message'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    credentials: true
  }
})

io.use(socketAuthMiddleware)

io.on('connection', (socket) => {
  const userId = socket.data.userId as string
  socket.join(userId)

  registerMessageHandlers(io, socket)

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', userId)
  })
})

httpServer.listen(SOCKET_PORT, () => {
  console.log(`Socket server rodando na porta ${SOCKET_PORT}`)
})