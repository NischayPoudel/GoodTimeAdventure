import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { GalleryItem } from '@/lib/models/GalleryItem'
import { galleryItemSchema } from '@/lib/validations'

export async function GET() {
  try {
    await connectDB()
    const items = await GalleryItem.find().sort({ createdAt: -1 })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = galleryItemSchema.parse(body)

    await connectDB()
    const item = new GalleryItem(validatedData)
    await item.save()

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}