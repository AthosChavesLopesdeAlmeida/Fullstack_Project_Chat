'use client'
import { useState, useEffect } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { useChat } from '@/hooks/useChat'
import { apiFetch } from '@/lib/fetcher'
import Link from 'next/link'

const Page = ({ params }: { params: { contactId: string } }) => {
  const socketRef = useSocket()
  const [initialMessages, setInitialMessages] = useState([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/messages/${params.contactId}`)
      .then((res) => res.json())
      .then(setInitialMessages)
  }, [params.contactId])

  useEffect(() => {
    apiFetch('/api/me', { method: 'GET' }).then(({ ok, data }) => {
      if (ok) setCurrentUserId(data.id)
    })
  }, [])

  const { messages, sendMessage } = useChat(socketRef, params.contactId, initialMessages)
  const [input, setInput] = useState('')

  function handleSubmit() {
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex h-screen flex-col bg-[#14151F]">
      <header className="flex items-center border-b border-[#2A2C3D] bg-[#1A1B26] px-5 py-3">
        <Link href={'/'} className="text-sm font-medium text-[#8B8FA3] transition-colors hover:text-[#EDEDF4]">
          ← Voltar
        </Link>
      </header>

      <ul className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-4">
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUserId
          return (
            <li
              key={msg.id}
              className={`max-w-[70%] px-4 py-2 text-sm ${
                isOwn
                  ? 'self-end rounded-2xl rounded-br-sm bg-gradient-to-r from-[#FF6B4A] to-[#FF8D5C] text-[#14151F]'
                  : 'self-start rounded-2xl rounded-bl-sm bg-[#242739] text-[#EDEDF4]'
              }`}
            >
              {msg.content}
            </li>
          )
        })}
      </ul>

      <div className="flex items-center gap-3 border-t border-[#2A2C3D] bg-[#1A1B26] px-5 py-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma mensagem..."
          className="flex-1 rounded-full border border-[#2E3244] bg-[#20222E] px-4 py-2.5 text-sm text-[#EDEDF4] placeholder-[#5B5F73] outline-none transition-colors focus:border-[#FF6B4A]"
        />
        <button onClick={handleSubmit} className="rounded-full bg-gradient-to-r from-[#FF6B4A] to-[#FF8D5C] px-5 py-2.5 text-sm font-semibold text-[#14151F] transition-opacity hover:opacity-90">
          Enviar
        </button>
      </div>
    </div>
  )
}

export default Page