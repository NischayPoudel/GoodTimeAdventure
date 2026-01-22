import { connectDB } from '@/lib/db'
import { GalleryItem } from '@/lib/models/GalleryItem'
import { GalleryGrid } from '@/components/GalleryGrid'

export default async function GalleryPage() {
  await connectDB()
  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean()

  // Convert to plain objects to avoid serialization issues
  const itemsData = JSON.parse(JSON.stringify(items))

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-4xl font-bold text-center mb-8">Photo Gallery</h1>
      <GalleryGrid items={itemsData} />
    </div>
  )
}