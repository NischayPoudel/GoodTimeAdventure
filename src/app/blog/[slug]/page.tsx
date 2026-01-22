import { connectDB } from '@/lib/db'
import { BlogPost } from '@/lib/models/BlogPost'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  await connectDB()
  const post = await BlogPost.findOne({ slug, published: true }).lean()

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600">{new Date(post.createdAt).toDateString()}</p>
        </header>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  )
}