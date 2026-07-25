import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { getUserFromRequest } from "@/lib/auth";

export async function GET (req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({message: 'Usuário não encontrado'}, {status: 401})
  }

  const contacts = await prisma.contact.findMany({
    where: {ownerId: user.userId, contactId: user.userId}
  })
  return NextResponse.json(contacts, {status: 200})
}

export async function POST (req: NextRequest) {
  const { contactEmail } = await req.json()
  const user = getUserFromRequest(req)
  
  if (!user) {
    return NextResponse.json({message: 'Não autenticado'}, {status: 401})
  }
  
  if (!contactEmail) {
    return NextResponse.json({ message: 'Email é obrigatório' }, { status: 400 })
  }

  const ownerId = user.userId
  
  const contactUser = await prisma.user.findUnique({
    where: {email: contactEmail}
  })
  if (!contactUser) {
    return NextResponse.json({message: 'Usuário não encontrado'}, {status: 404})
  }

  if (contactUser.id === ownerId) {
    return NextResponse.json({ error: "Você não pode adicionar a si mesmo como um contato" }, { status: 400 })
  }

  try {
    const contact = await prisma.contact.create({
      data: { ownerId, contactId: contactUser.id }
    })
    return NextResponse.json(contact, { status: 201 })
    
  } catch (err: unknown) {

    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ message: 'Contato já adicionado' }, { status: 409 })
    }

    return NextResponse.json({ message: 'Erro ao adicionar contato' }, { status: 500 })
  }
}