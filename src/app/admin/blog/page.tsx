import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { BlogPost } from '@/lib/models/BlogPost'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  await connectDB()
  const blogPosts = await BlogPost.find().sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button>Add New Post</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post._id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <p className="text-sm text-gray-500">{post.createdAt.toDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blog/${post._id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}