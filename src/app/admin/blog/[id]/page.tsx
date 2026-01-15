import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { BlogPost } from '@/lib/models/BlogPost'
import { BlogForm } from '@/components/BlogForm'

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  const { id } = await params

  await connectDB()
  const post = await BlogPost.findById(id)

  if (!post) {
    redirect('/admin/blog')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <BlogForm initialData={post} />
    </div>
  )
}