'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/fetcher"

const Page = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const {ok, data} = await apiFetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify({ contactEmail: email })
    })

    if (!ok) {
      setError(data?.message || 'Erro ao adicionar contato')
      return
    }

    router.push('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#14151F] px-4">
      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-sm rounded-2xl border border-[#2A2C3D] bg-[#1A1B26] p-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-[#8B8FA3]">Email</label>
          <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email"
            className="rounded-lg border border-[#2E3244] bg-[#20222E] px-3 py-2 text-sm text-[#EDEDF4] placeholder-[#5B5F73] outline-none transition-colors focus:border-[#FF6B4A]"/>
        </div>

        {error && <p className="mt-3 text-sm text-[#FF6B6B]">{error}</p>}

        <button type="submit" className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#FF6B4A] to-[#FF8D5C] py-2.5 text-sm font-semibold text-[#14151F] transition-opacity hover:opacity-90">
          Adicionar +
        </button>
      </form>
    </div>
  )
}

export default Page