import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { tourSchema } from '@/lib/validations'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await connectDB()
    const tour = await Tour.findById(id)
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }
    return NextResponse.json(tour)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tour' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions) as any
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = tourSchema.parse(body)

    await connectDB()
    const tour = await Tour.findByIdAndUpdate(id, validatedData, { new: true })
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }
    return NextResponse.json(tour)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions) as any
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const tour = await Tour.findByIdAndDelete(id)
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Tour deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tour' }, { status: 500 })
  }
}