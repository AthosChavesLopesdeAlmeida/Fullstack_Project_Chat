import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function DELETE (req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = getUserFromRequest(req)

  if (!user) {
    return NextResponse.json({message: 'Não autenticado'}, {status: 401})
  }

  const selectedUser = await prisma.user.findUnique({
    where: {id}
  })

  if (!selectedUser) {
    return NextResponse.json({message: 'Usuário não encontrado'}, {status: 404})
  }

  if (id === user.userId) {
    return NextResponse.json({message: 'Vá para as configurações para excluir sua conta'}, {status: 400})
  }

  await prisma.contact.delete({
    where: {
      ownerId_contactId: {
        ownerId: user.userId,
        contactId: id
      }
    }
  })
  return NextResponse.json({message: 'Contato bloqueado com sucesso'}, {status: 201})
}