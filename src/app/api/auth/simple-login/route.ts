import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { MongoClient } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    const mongoUrl = process.env.MONGODB_URI
    if (!mongoUrl) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const client = new MongoClient(mongoUrl)
    await client.connect()

    try {
      const db = client.db('goodtime-adventure')
      const user = await db.collection('users').findOne({
        email: email.toLowerCase().trim(),
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      const isValid = await bcryptjs.compare(password, user.passwordHash)

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        },
      })
    } finally {
      await client.close()
    }
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}
