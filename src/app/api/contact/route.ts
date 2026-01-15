import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { ContactMessage } from '@/lib/models/ContactMessage'
import { contactMessageSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactMessageSchema.parse(body)

    await connectDB()
    const message = new ContactMessage(validatedData)
    await message.save()

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}