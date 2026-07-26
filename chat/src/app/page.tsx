'use client'
import Sidebar from "@/components/sidebar"

const Page = () => {
  return (
    <div className="flex h-screen bg-[#14151F] text-[#EDEDF4]">
      <Sidebar/>
      <main className="flex flex-1 items-center justify-center px-8">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B4A] to-[#FFA857] text-2xl">
            💬
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-[#EDEDF4]">
            Clique em um contato para começar uma conversa!
          </h1>
        </div>
      </main>
    </div>
  )
}

export default Page