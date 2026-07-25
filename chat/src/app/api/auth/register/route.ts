import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, name, password, pfpUrl } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({message: 'Nome, email e senha são obrigatórios'}, {status: 400})
  }

  const user = await prisma.user.findUnique({where: { email }})
  if (user) {
    return NextResponse.json({message: 'O usuário já existe'}, {status: 409})
  }

  const hashedPassword = await hashPassword(password)
  const newUser = await prisma.user.create({
    data: {email, name, password: hashedPassword, pfpUrl}
  })

  const token = generateToken(newUser.id)
  const response = NextResponse.json({message: 'Usuário criado com sucesso'}, {status: 200})

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })
  return response
}