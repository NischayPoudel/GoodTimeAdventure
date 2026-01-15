import { connectDB } from '@/lib/db'
import { BlogPost } from '@/lib/models/BlogPost'
import { BlogCard } from '@/components/BlogCard'

export async function LatestBlog() {
  await connectDB()
  const posts = await BlogPost.find({ published: true }).limit(3).sort({ createdAt: -1 })

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}