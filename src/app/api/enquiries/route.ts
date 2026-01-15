import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Enquiry } from '@/lib/models/Enquiry'
import { enquirySchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions) as any as any
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    return NextResponse.json(enquiries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = enquirySchema.parse(body)

    await connectDB()
    const enquiry = await Enquiry.create(validatedData)
    return NextResponse.json(enquiry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
}