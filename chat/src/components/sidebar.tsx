'use client'
import { apiFetch } from "@/lib/fetcher"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

type Contact = {
  pfp: string,
  name: string,
  id: string
}

const Sidebar = () => {
  const [contacts, setContacts] = useState<Contact[]>([]) 
  const [error, setError] = useState('')

  const fetchContacts = async () => {
    setError('')
    const {ok, data} = await apiFetch('/api/contacts', {method: 'GET'})

    if (!ok) {
      setError(data?.message || 'Erro ao buscar contatos')
      return
    }

    setContacts(data)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="flex h-screen w-80 flex-col border-r border-[#2A2C3D] bg-[#1A1B26]">
      <div className="border-b border-[#2A2C3D] px-5 py-5">
        <Link href={'/me'} className="block text-sm font-medium text-[#8B8FA3] transition-colors hover:text-[#EDEDF4]">
          Minha conta →
        </Link>
        <Link
          href={'/addContact'}
          className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6B4A] to-[#FF8D5C] px-4 py-2 text-sm font-semibold text-[#14151F] transition-opacity hover:opacity-90"
        >
          Adicionar contato +
        </Link>
        <h5 className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#5B5F73]">Meus contatos</h5>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {error && <p className="px-3 py-2 text-sm text-[#FF6B6B]">{error}</p>}
        <ul className="flex flex-col gap-1">
          {contacts.map((contact) => (
            <li key={contact.id}>
              <Link
                href={`/contact/${contact.id}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[#242739]"
              >
              <Image
                src={contact.pfp ? contact.pfp : 'https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80'}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#2DD4BF]/30"
              />
                <p className="truncate text-sm font-medium text-[#EDEDF4]">{contact.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar