import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { GalleryItem } from '@/lib/models/GalleryItem'
import { galleryItemSchema } from '@/lib/validations'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()
    const item = await GalleryItem.findById(id)

    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching gallery item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = galleryItemSchema.parse(body)

    await connectDB()
    const item = await GalleryItem.findByIdAndUpdate(id, validatedData, { new: true })

    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await connectDB()
    const item = await GalleryItem.findByIdAndDelete(id)

    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}