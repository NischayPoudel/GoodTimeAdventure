import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { BlogPost } from '@/lib/models/BlogPost'
import { blogPostSchema } from '@/lib/validations'

export async function GET() {
  try {
    await connectDB()
    const posts = await BlogPost.find().sort({ createdAt: -1 })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
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
    const validatedData = blogPostSchema.parse(body)

    await connectDB()
    const post = new BlogPost(validatedData)
    await post.save()

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}