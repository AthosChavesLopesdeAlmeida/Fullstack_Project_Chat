import { Server, Socket } from 'socket.io'
import { prisma } from '@/lib/prisma'

type SendMessagePayload = {
  receiverId: string
  content: string
}

export function registerMessageHandlers(io: Server, socket: Socket) {
  socket.on('message:send', async (payload: SendMessagePayload) => {
    const senderId = socket.data.userId as string

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId: payload.receiverId,
        content: payload.content
      }
    })

    socket.emit('message:sent', message)
    io.to(payload.receiverId).emit('message:receive', message)
  })
}