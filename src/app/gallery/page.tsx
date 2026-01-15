import { connectDB } from '@/lib/db'
import { GalleryItem } from '@/lib/models/GalleryItem'
import { GalleryGrid } from '@/components/GalleryGrid'

export default async function GalleryPage() {
  await connectDB()
  const items = await GalleryItem.find().sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Photo Gallery</h1>
      <GalleryGrid items={items} />
    </div>
  )
}