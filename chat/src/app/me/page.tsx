'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { apiFetch } from "@/lib/fetcher"
import { useRouter } from "next/navigation"

type userData = {
  id: string,
  email: string,
  pfpUrl: string,
  name: string
}

const Page = () => {
  const [userData, setUserData] = useState<userData | undefined>(undefined)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchUserData = async () => {
    setError('')
    const {ok, data} = await apiFetch('/api/me', {method: 'GET'})

    if (!ok) {
      setError(data?.message || 'Não foi possível buscar seus dados')
      return
    }

    setUserData(data)
  }

  const deleteAccount = async () => {
    const {ok} = await apiFetch('/api/auth/delete', {method: 'POST'})

    if (!ok) {
      setError('Não foi possível excluir sua conta')
      return
    }

    router.push('/register')
  }

  const handleLogout = async () => {
    const {ok} = await apiFetch('/api/auth/logout', {method: 'POST'})

    if (!ok) {
      setError('Não foi possível fazer logout')
      return
    }

    router.push('/login')
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#14151F] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#2A2C3D] bg-[#1A1B26] p-8 text-center">
        <Image
          src={userData?.pfpUrl ? userData.pfpUrl : 'https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80'}
          alt=""
          width={88}
          height={88}
          className="mx-auto h-[88px] w-[88px] rounded-full object-cover ring-4 ring-[#2DD4BF]/20"
        />
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-[#EDEDF4]">{userData?.name}</h2>
        <p className="text-sm text-[#8B8FA3]">{userData?.email}</p>
        <span className="mt-1 block text-xs text-[#5B5F73]">{userData?.id}</span>

        <div className="mt-6 flex flex-col gap-2">
          <Link href={'/'} className="rounded-lg border border-[#2E3244] py-2 text-sm font-medium text-[#EDEDF4] transition-colors hover:bg-[#242739]">
            Voltar
          </Link>
          <button onClick={() => handleLogout()} className="rounded-lg border border-[#2E3244] py-2 text-sm font-medium text-[#EDEDF4] transition-colors hover:bg-[#242739]">
            Fazer logout
          </button>
          <button onClick={() => deleteAccount()} className="rounded-lg py-2 text-sm font-medium text-[#FF6B6B] transition-colors hover:bg-[#FF6B6B]/10">
            Excluir conta
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-[#FF6B6B]">{error}</p>}
      </div>
    </div>
  )
}

export default Page