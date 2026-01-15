import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Enquiry } from '@/lib/models/Enquiry'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await connectDB()
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { responded: true },
      { new: true }
    )

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    return NextResponse.json(enquiry)
  } catch (error) {
    console.error('Error updating enquiry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}