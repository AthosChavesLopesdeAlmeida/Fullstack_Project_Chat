'use client'
import { useState } from "react";
import { apiFetch } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pfpUrl, setPfpUrl] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const { ok, data } = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({email, password, pfpUrl, name})
    })

    if (!ok) {
      setError(data?.message || 'Erro ao registrar usuário')
      return
    }

    router.push('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#14151F] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold tracking-tight text-[#EDEDF4]">Crie uma conta</h3>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 rounded-2xl border border-[#2A2C3D] bg-[#1A1B26] p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#8B8FA3]">Nome de usuário</label>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Digite seu nome'
              className="rounded-lg border border-[#2E3244] bg-[#20222E] px-3 py-2 text-sm text-[#EDEDF4] placeholder-[#5B5F73] outline-none transition-colors focus:border-[#FF6B4A]"/>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#8B8FA3]">Senha</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Digite sua senha'
              className="rounded-lg border border-[#2E3244] bg-[#20222E] px-3 py-2 text-sm text-[#EDEDF4] placeholder-[#5B5F73] outline-none transition-colors focus:border-[#FF6B4A]"/>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#8B8FA3]">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu email'
              className="rounded-lg border border-[#2E3244] bg-[#20222E] px-3 py-2 text-sm text-[#EDEDF4] placeholder-[#5B5F73] outline-none transition-colors focus:border-[#FF6B4A]"/>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#8B8FA3]">URL da foto de perfil</label>
            <input type="text" onChange={(e) => setPfpUrl(e.target.value)} placeholder='URL'
              className="rounded-lg border border-[#2E3244] bg-[#20222E] px-3 py-2 text-sm text-[#EDEDF4] placeholder-[#5B5F73] outline-none transition-colors focus:border-[#FF6B4A]"/>
          </div>

          <Link href={'/login'} className="text-center">
            <p className="text-xs text-[#8B8FA3] transition-colors hover:text-[#2DD4BF]">Já tem uma conta? Faça login aqui</p>
          </Link>

          <button type="submit" className="mt-1 rounded-lg bg-gradient-to-r from-[#FF6B4A] to-[#FF8D5C] py-2.5 text-sm font-semibold text-[#14151F] transition-opacity hover:opacity-90">
            Registrar
          </button>

          {error && <p className="text-center text-sm text-[#FF6B6B]">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Page