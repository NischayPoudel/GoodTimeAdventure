import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { BlogPost } from '@/lib/models/BlogPost'
import { Enquiry } from '@/lib/models/Enquiry'
import { GalleryItem } from '@/lib/models/GalleryItem'
import { Card } from '@/components/ui/Card'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  await connectDB()
  const [tourCount, blogCount, enquiryCount, galleryCount, recentEnquiries] = await Promise.all([
    Tour.countDocuments(),
    BlogPost.countDocuments(),
    Enquiry.countDocuments(),
    GalleryItem.countDocuments(),
    Enquiry.find().sort({ createdAt: -1 }).limit(5),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 text-center">
          <h2 className="text-2xl font-bold">{tourCount}</h2>
          <p>Tours</p>
        </Card>
        <Card className="p-4 text-center">
          <h2 className="text-2xl font-bold">{enquiryCount}</h2>
          <p>Enquiries</p>
        </Card>
        <Card className="p-4 text-center">
          <h2 className="text-2xl font-bold">{blogCount}</h2>
          <p>Blog Posts</p>
        </Card>
        <Card className="p-4 text-center">
          <h2 className="text-2xl font-bold">{galleryCount}</h2>
          <p>Gallery Items</p>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-4">Recent Enquiries</h2>
      <div className="space-y-4">
        {recentEnquiries.map((enquiry) => (
          <Card key={enquiry._id} className="p-4">
            <p><strong>{enquiry.fullName}</strong> - {enquiry.tourId}</p>
            <p>{enquiry.message}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}