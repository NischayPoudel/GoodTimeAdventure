import { connectDB } from '@/lib/db'
import { BlogPost } from '@/lib/models/BlogPost'
import { BlogCard } from '@/components/BlogCard'

export default async function BlogPage() {
  await connectDB()
  const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Travel Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}