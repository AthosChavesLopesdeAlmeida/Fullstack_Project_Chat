import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { getUserFromRequest } from "@/lib/auth";

export async function GET (req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({message: 'Não autenticado'}, {status: 401})
  }

  const contacts = await prisma.contact.findMany({
    where: { ownerId: user.userId },
    include: { contact: true }
  })

  const formatted = contacts.map((c) => ({
    id: c.contact.id,
    name: c.contact.name,
    pfp: c.contact.pfpUrl
  }))

  return NextResponse.json(formatted, {status: 200})
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 })
  }

  const { contactEmail } = await req.json()

  if (!contactEmail) {
    return NextResponse.json({ message: 'Email é obrigatório' }, { status: 400 })
  }

  const ownerId = user.userId

  const contactUser = await prisma.user.findUnique({
    where: { email: contactEmail }
  })

  if (!contactUser) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 })
  }

  if (contactUser.id === ownerId) {
    return NextResponse.json({ message: 'Você não pode adicionar a si mesmo como um contato' }, { status: 400 })
  }

  try {
    await prisma.contact.createMany({
      data: [
        { ownerId, contactId: contactUser.id },
        { ownerId: contactUser.id, contactId: ownerId }
      ],
      skipDuplicates: true
    })

    return NextResponse.json({ message: 'Contato adicionado com sucesso' }, { status: 201 })
  } catch (err: unknown) {
    return NextResponse.json({ message: 'Erro ao adicionar contato' }, { status: 500 })
  }
}