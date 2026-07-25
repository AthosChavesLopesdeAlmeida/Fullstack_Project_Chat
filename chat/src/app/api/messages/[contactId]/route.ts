import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: {params: {contactId: string}}) {
  const user = getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 })
  }

  const { contactId } = params

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {senderId: user.userId, receiverId: contactId},
        {senderId: contactId, receiverId: user.userId}
      ]
    }
  })

  return NextResponse.json(messages, {status: 200})
}