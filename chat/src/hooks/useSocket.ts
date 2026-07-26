import { useEffect, useRef } from 'react'
import { createSocket } from '@/lib/socket-client'

export function useSocket() {
  const socketRef = useRef<ReturnType<typeof createSocket> | null>(null)

  useEffect(() => {
    const socket = createSocket()
    socketRef.current = socket

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  return socketRef
}