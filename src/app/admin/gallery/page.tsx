import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { GalleryItem } from '@/lib/models/GalleryItem'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  await connectDB()
  const galleryItems = await GalleryItem.find().sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <Link href="/admin/gallery/new">
          <Button>Add New Item</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <Card key={item._id} className="p-4">
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover mb-2" />
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.category}</p>
            <div className="flex gap-2 mt-2">
              <Link href={`/admin/gallery/${item._id}`}>
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}