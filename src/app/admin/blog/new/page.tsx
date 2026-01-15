import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { BlogForm } from '@/components/BlogForm'

export default async function AdminBlogNewPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Blog Post</h1>
      <BlogForm />
    </div>
  )
}