import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req)

  if (!user) {
    return NextResponse.json({message: 'Não autenticado'}, {status: 401})
  }

  const userData = await prisma.user.findUnique({
    where: {id: user.userId},
    select: {name: true, email: true, createdAt: true, id: true, pfpUrl: true}
  })

  if (!userData) {
    return NextResponse.json({message: 'Dados não encontrados'}, {status: 404})
  }
  return NextResponse.json(userData, {status: 200})
}