import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models/User'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    await connectDB()
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      role: 'user',
      wishlist: [],
    })

    return NextResponse.json({ message: 'User created' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
}