import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { tourSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const tours = await Tour.find({ published: true }).sort({ createdAt: -1 })
    return NextResponse.json(tours)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions) as any
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = tourSchema.parse(body)

    await connectDB()
    const tour = await Tour.create(validatedData)
    return NextResponse.json(tour, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
}