import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
}

export function useChat(socketRef: React.RefObject<Socket | null>, contactId: string, initialMessages: Message[]) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  useEffect(() => {
    const socket = socketRef.current
    if (!socket) return

    function handleReceive(message: Message) {
      if (message.senderId === contactId) {
        setMessages((prev) => [...prev, message])
      }
    }

    function handleSent(message: Message) {
      if (message.receiverId === contactId) {
        setMessages((prev) => [...prev, message])
      }
    }

    socket.on('message:receive', handleReceive)
    socket.on('message:sent', handleSent)

    return () => {
      socket.off('message:receive', handleReceive)
      socket.off('message:sent', handleSent)
    }
  }, [socketRef, contactId])

  function sendMessage(content: string) {
    const socket = socketRef.current
    if (!socket) return

    socket.emit('message:send', { receiverId: contactId, content })
  }

  return { messages, sendMessage }
}