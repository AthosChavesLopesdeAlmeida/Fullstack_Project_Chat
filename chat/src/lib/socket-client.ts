import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

export function createSocket(): Socket {
  return io(SOCKET_URL, {
    withCredentials: true
  })
}