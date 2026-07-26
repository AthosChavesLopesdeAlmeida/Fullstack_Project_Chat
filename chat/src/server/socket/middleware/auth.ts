// server/socket/middleware/auth.ts
import { Socket } from 'socket.io'
import { verifyToken } from '@/lib/auth'

function parseCookies(cookieHeader: string): Record<string, string> {
  return cookieHeader
    .split(';')
    .reduce((acc: Record<string, string>, pair) => {
      const [key, value] = pair.trim().split('=')
      if (key && value) acc[key] = decodeURIComponent(value)
      return acc
    }, {})
}

export function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void) {
  const cookies = parseCookies(socket.handshake.headers.cookie || '')
  const token = cookies['token']

  if (!token) {
    return next(new Error('Não autenticado'))
  }

  const payload = verifyToken(token)
  if (!payload) {
    return next(new Error('Token inválido'))
  }

  socket.data.userId = payload.userId
  next()
}